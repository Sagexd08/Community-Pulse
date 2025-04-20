import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-server';
import { createSpeechRecognitionService } from '@/lib/ai/speech-recognition';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { audioUrl, issueId, language } = body;

    if (!audioUrl) {
      return NextResponse.json(
        { error: 'Audio URL is required' },
        { status: 400 }
      );
    }

    // Initialize the speech recognition service
    const speechService = createSpeechRecognitionService();

    // Transcribe the audio
    const transcriptionResult = await speechService.transcribeAudio(audioUrl, language || 'en-US');

    if (transcriptionResult.error) {
      console.error('Transcription error:', transcriptionResult.error);
      return NextResponse.json(
        { error: `Failed to transcribe audio: ${transcriptionResult.error}` },
        { status: 500 }
      );
    }

    // If issueId is provided, store the transcription in Supabase
    if (issueId) {
      const supabase = createAdminSupabaseClient();

      // Check if there's an existing transcription for this issue
      const { data: existingTranscription } = await supabase
        .from('transcriptions')
        .select('id')
        .eq('issue_id', issueId)
        .maybeSingle();

      if (existingTranscription) {
        // Update existing transcription
        await supabase
          .from('transcriptions')
          .update({
            text: transcriptionResult.text,
            confidence: transcriptionResult.confidence,
            language: transcriptionResult.language || 'en-US',
            segments: transcriptionResult.segments || [],
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingTranscription.id);
      } else {
        // Create new transcription
        await supabase
          .from('transcriptions')
          .insert({
            issue_id: issueId,
            text: transcriptionResult.text,
            confidence: transcriptionResult.confidence,
            language: transcriptionResult.language || 'en-US',
            segments: transcriptionResult.segments || [],
            created_at: new Date().toISOString(),
          });
      }

      // Also update the issue with the transcription text
      await supabase
        .from('issues')
        .update({
          description: supabase.rpc('append_text', {
            original_text: supabase.rpc('get_issue_description', { issue_id: issueId }),
            new_text: `\n\nAudio Transcription: ${transcriptionResult.text}`
          }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', issueId);
    }

    return NextResponse.json({
      success: true,
      transcription: transcriptionResult,
    });
  } catch (error) {
    console.error('Error in transcribe-audio API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
