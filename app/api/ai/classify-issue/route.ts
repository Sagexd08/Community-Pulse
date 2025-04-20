import { NextRequest, NextResponse } from 'next/server';
import { createIssueClassifier } from '@/lib/ai/issue-classifier';

export async function POST(request: NextRequest) {
  try {

    // You might want to require authentication for this endpoint
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized', message: 'You must be logged in to use this endpoint' },
    //     { status: 401 }
    //   );
    // }

    // Parse the request body
    const body = await request.json();

    // Validate input
    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title and description' },
        { status: 400 }
      );
    }

    // Initialize the classifier
    const classifier = createIssueClassifier();

    // Classify the issue
    const classification = await classifier.classifyIssue(
      body.title,
      body.description,
      body.location
    );

    // Return the classification result
    return NextResponse.json({
      success: true,
      ...classification
    });
  } catch (error: any) {
    console.error('Error in classify-issue API route:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Classification failed',
        message: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}