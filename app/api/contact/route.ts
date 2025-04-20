import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase';
import axios from 'axios';
import { contactFormSchema } from '@/lib/validation-schemas';
import {
  AppError,
  ErrorType,
  handleApiError,
  validateRequest,
  withRetry,
  globalRateLimiter
} from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!globalRateLimiter.check(`contact_${ip}`)) {
      throw new AppError(
        'Too many requests, please try again later',
        ErrorType.RATE_LIMIT,
        'RATE_LIMIT_EXCEEDED'
      );
    }

    // Parse and validate request body
    const body = await request.json().catch(() => {
      throw new AppError(
        'Invalid JSON in request body',
        ErrorType.VALIDATION,
        'INVALID_JSON'
      );
    });

    // Validate against schema
    const validatedData = validateRequest(body, contactFormSchema);

    // Create Supabase client
    const supabase = createAdminSupabaseClient();

    // Insert contact message into database with retry mechanism
    const data = await withRetry(
      async () => {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert({
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            email: validatedData.email,
            phone_number: validatedData.phoneNumber || null,
            subject: validatedData.subject,
            message: validatedData.message,
            status: 'new',
            callback_requested: validatedData.callbackRequested || false,
            created_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          throw new AppError(
            'Failed to save contact message',
            ErrorType.DATABASE,
            'DATABASE_INSERT_FAILED',
            { details: error },
            error
          );
        }

        return data;
      },
      {
        retries: 3,
        delay: 300,
        backoff: 2,
        shouldRetry: (error) => {
          // Only retry on connection errors, not validation errors
          return error instanceof AppError && error.type === ErrorType.DATABASE;
        }
      }
    );

    // If callback is requested, send to n8n webhook
    if (validatedData.callbackRequested && validatedData.phoneNumber) {
      try {
        // Add timeout and retry for n8n webhook call
        await withRetry(
          async () => {
            const response = await axios.post(
              process.env.N8N_WEBHOOK_URL!,
              {
                contactId: data.id,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                email: validatedData.email,
                phoneNumber: validatedData.phoneNumber,
                subject: validatedData.subject,
                message: validatedData.message,
                timestamp: new Date().toISOString(),
                source: 'contact_form',
                environment: process.env.NODE_ENV
              },
              {
                timeout: 5000, // 5 second timeout
                headers: {
                  'Content-Type': 'application/json',
                  'X-API-Key': process.env.N8N_API_KEY || '',
                  'User-Agent': 'CommunityPulse/1.0'
                }
              }
            );

            // Check for non-200 responses
            if (response.status < 200 || response.status >= 300) {
              throw new AppError(
                `n8n webhook returned status ${response.status}`,
                ErrorType.EXTERNAL_SERVICE,
                'N8N_WEBHOOK_ERROR',
                { status: response.status, data: response.data }
              );
            }

            return response.data;
          },
          {
            retries: 2,
            delay: 500,
            shouldRetry: (error) => {
              // Retry on network errors or 5xx responses
              if (axios.isAxiosError(error)) {
                return !error.response || error.response.status >= 500;
              }
              return false;
            }
          }
        );
      } catch (n8nError) {
        // Log the error but don't fail the request
        const appError = new AppError(
          'Error sending to n8n webhook',
          ErrorType.EXTERNAL_SERVICE,
          'N8N_WEBHOOK_FAILED',
          { contactId: data.id },
          n8nError instanceof Error ? n8nError : new Error(String(n8nError))
        );

        // Log but continue
        console.error('n8n webhook error:', appError);

        // Update the contact record to indicate webhook failure
        await supabase
          .from('contact_messages')
          .update({
            status: 'webhook_failed',
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id)
          .then(result => {
            if (result.error) {
              console.error('Failed to update contact status after webhook failure:', result.error);
            }
          });
      }
    }

    // Return success response with rate limit headers
    const response = NextResponse.json(
      {
        success: true,
        message: 'Contact message sent successfully',
        id: data.id,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

    // Add rate limit headers
    const remaining = globalRateLimiter.getRemainingRequests(`contact_${ip}`);
    const resetTime = globalRateLimiter.getResetTime(`contact_${ip}`);

    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    if (resetTime) {
      response.headers.set('X-RateLimit-Reset', resetTime.toString());
    }

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
