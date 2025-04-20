import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { GeminiClient } from '@/lib/ai/gemini-client';

// Initialize the Gemini client
const geminiClient = new GeminiClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { caption, currentText, storyId } = body;

    if (!caption || !currentText) {
      return NextResponse.json(
        { error: 'Caption and current text are required' },
        { status: 400 }
      );
    }

    // Generate story continuation
    const continuation = await geminiClient.generateStoryContinuation(caption, currentText);
    
    // If storyId is provided, update the story in the database
    if (storyId) {
      const supabase = createServerSupabaseClient();
      
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Update the story content
        const { error } = await supabase
          .from('stories')
          .update({
            content: currentText + ' ' + continuation,
            updated_at: new Date().toISOString(),
          })
          .eq('id', storyId)
          .eq('user_id', session.user.id);

        if (error) {
          console.error('Error updating story:', error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      continuation: continuation,
    });
  } catch (error) {
    console.error('Error in story continuation API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
