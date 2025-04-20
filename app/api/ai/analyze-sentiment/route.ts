import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase';
import { GeminiClient } from '@/lib/ai/gemini-client';
import { createRAGKnowledgeBase } from '@/lib/ai/rag-knowledge-base';

// Initialize the Gemini client
const geminiClient = new GeminiClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, issueId } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Get issue category if issueId is provided
    let category = undefined;
    if (issueId) {
      const supabase = createAdminSupabaseClient();
      const { data: issueData } = await supabase
        .from('issues')
        .select('category')
        .eq('id', issueId)
        .single();

      if (issueData) {
        category = issueData.category;
      }
    }

    // Analyze sentiment with RAG if category is available
    const sentimentResult = await geminiClient.analyzeSentiment(text, category);

    // If issueId is provided, store the sentiment analysis result
    if (issueId) {
      const supabase = createAdminSupabaseClient();

      // Check if there's an existing analysis for this issue
      const { data: existingAnalysis } = await supabase
        .from('ai_analysis')
        .select('id, classification_result')
        .eq('issue_id', issueId)
        .maybeSingle();

      // Get issue details for generating suggestions
      const { data: issueData } = await supabase
        .from('issues')
        .select('category, description')
        .eq('id', issueId)
        .single();

      // Generate suggestions based on issue data and sentiment using RAG
      let suggestions = '';
      if (issueData) {
        suggestions = await geminiClient.generateSuggestions(
          issueData.description,
          issueData.category,
          existingAnalysis?.classification_result,
          true // Use RAG for better suggestions
        );
      }

      // Prepare update data
      const analysisData = {
        sentiment_score: sentimentResult.score,
        suggestions: suggestions,
        updated_at: new Date().toISOString(),
      };

      // Add context if available from RAG
      if (sentimentResult.context) {
        analysisData['metadata'] = {
          ...((existingAnalysis?.metadata as any) || {}),
          context: sentimentResult.context,
          last_updated: new Date().toISOString(),
        };
      }

      if (existingAnalysis) {
        // Update existing analysis
        await supabase
          .from('ai_analysis')
          .update(analysisData)
          .eq('id', existingAnalysis.id);
      } else {
        // Create new analysis
        await supabase
          .from('ai_analysis')
          .insert({
            issue_id: issueId,
            sentiment_score: sentimentResult.score,
            classification_result: {}, // Will be populated by image classification
            suggestions: suggestions,
            created_at: new Date().toISOString(),
            metadata: sentimentResult.context ? { context: sentimentResult.context } : null,
          });
      }
    }

    return NextResponse.json({
      success: true,
      sentiment: sentimentResult,
    });
  } catch (error) {
    console.error('Error in sentiment analysis API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
