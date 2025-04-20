import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase';
import { LSTMImageClassifier } from '@/lib/ai/lstm-image-classifier';

// Initialize the classifier
let classifier: LSTMImageClassifier | null = null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, issueId } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Initialize classifier if not already initialized
    if (!classifier) {
      classifier = new LSTMImageClassifier();
      // Wait a moment for the model to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Classify the image
    const classificationResult = await classifier.classifyImage(imageUrl);
    
    if (!classificationResult) {
      return NextResponse.json(
        { error: 'Failed to classify image' },
        { status: 500 }
      );
    }

    // If issueId is provided, store the classification result
    if (issueId) {
      const supabase = createAdminSupabaseClient();
      
      // Check if there's an existing analysis for this issue
      const { data: existingAnalysis } = await supabase
        .from('ai_analysis')
        .select('id')
        .eq('issue_id', issueId)
        .maybeSingle();

      if (existingAnalysis) {
        // Update existing analysis
        await supabase
          .from('ai_analysis')
          .update({
            classification_result: classificationResult,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingAnalysis.id);
      } else {
        // Create new analysis
        await supabase
          .from('ai_analysis')
          .insert({
            issue_id: issueId,
            classification_result: classificationResult,
            sentiment_score: 0, // Default value, will be updated by sentiment analysis
            suggestions: '', // Will be populated by LLM
            created_at: new Date().toISOString(),
          });
      }

      // Update the issue category based on classification
      await supabase
        .from('issues')
        .update({
          category: classificationResult.category,
          updated_at: new Date().toISOString(),
        })
        .eq('id', issueId);
    }

    return NextResponse.json({
      success: true,
      classification: classificationResult,
    });
  } catch (error) {
    console.error('Error in image classification API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
