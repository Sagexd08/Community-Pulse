import { NextResponse } from 'next/server';

// Error types
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  CONFLICT = 'CONFLICT_ERROR',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE_ERROR',
  DATABASE = 'DATABASE_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
}

// Error codes with HTTP status mappings
export const ErrorStatusMap: Record<ErrorType, number> = {
  [ErrorType.VALIDATION]: 400,
  [ErrorType.AUTHENTICATION]: 401,
  [ErrorType.AUTHORIZATION]: 403,
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.CONFLICT]: 409,
  [ErrorType.EXTERNAL_SERVICE]: 502,
  [ErrorType.DATABASE]: 500,
  [ErrorType.RATE_LIMIT]: 429,
  [ErrorType.INTERNAL]: 500,
};

// Custom error class with additional metadata
export class AppError extends Error {
  type: ErrorType;
  code: string;
  details?: any;
  originalError?: Error;

  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL,
    code: string = 'ERROR',
    details?: any,
    originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
    this.details = details;
    this.originalError = originalError;
  }
}

// Error logging function
export const logError = (error: Error | AppError, context?: any) => {
  const timestamp = new Date().toISOString();
  const errorType = error instanceof AppError ? error.type : 'UNKNOWN';
  const errorCode = error instanceof AppError ? error.code : 'UNKNOWN';
  const errorDetails = error instanceof AppError ? error.details : undefined;
  const originalError = error instanceof AppError ? error.originalError : undefined;

  // In production, this would send to a logging service like Sentry
  console.error(JSON.stringify({
    timestamp,
    type: errorType,
    code: errorCode,
    message: error.message,
    stack: error.stack,
    details: errorDetails,
    originalError: originalError?.message,
    context,
  }));
};

// Retry mechanism for async functions
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    backoff?: number;
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 300,
    backoff = 2,
    shouldRetry = () => true
  } = options;

  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt >= retries || !shouldRetry(error)) {
        throw error;
      }

      // Wait with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(backoff, attempt)));
    }
  }

  throw lastError;
}

// API response handler
export const handleApiError = (error: any) => {
  // Log the error and return appropriate response
  return errorHandler(error);
};

// Error handler function (alias for backward compatibility)
export const errorHandler = (error: any) => {
  // Convert to AppError if it's not already
  const appError = error instanceof AppError
    ? error
    : new AppError(
        error.message || 'An unexpected error occurred',
        ErrorType.INTERNAL,
        'UNEXPECTED_ERROR',
        undefined,
        error
      );

  // Log the error
  logError(appError);

  // Return appropriate response
  const status = ErrorStatusMap[appError.type];

  return NextResponse.json(
    {
      error: {
        type: appError.type,
        code: appError.code,
        message: appError.message,
        ...(process.env.NODE_ENV === 'development' && { details: appError.details }),
      }
    },
    { status }
  );
};

// Validation helper
export const validateRequest = <T>(
  data: any,
  schema: { validate: (data: any) => { error?: any; value: T } }
): T => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw new AppError(
      'Validation error',
      ErrorType.VALIDATION,
      'INVALID_REQUEST',
      error.details
    );
  }

  return value;
};

// Rate limiting helper
export class RateLimiter {
  private cache: Map<string, { count: number, resetTime: number }> = new Map();
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 100, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(key: string): boolean {
    const now = Date.now();
    const record = this.cache.get(key);

    if (!record) {
      this.cache.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (now > record.resetTime) {
      this.cache.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (record.count >= this.limit) {
      return false;
    }

    record.count += 1;
    this.cache.set(key, record);
    return true;
  }

  getRemainingRequests(key: string): number {
    const now = Date.now();
    const record = this.cache.get(key);

    if (!record || now > record.resetTime) {
      return this.limit;
    }

    return Math.max(0, this.limit - record.count);
  }

  getResetTime(key: string): number | null {
    const record = this.cache.get(key);
    return record ? record.resetTime : null;
  }
}

// Create a global rate limiter instance
export const globalRateLimiter = new RateLimiter();
