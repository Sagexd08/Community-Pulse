import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { createSpeechRecognitionService } from '@/lib/ai/speech-recognition';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const issueId = formData.get('issueId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createAdminSupabaseClient();

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('issue-audio')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (storageError) {
      console.error('Error uploading audio file:', storageError);
      return NextResponse.json(
        { error: 'Failed to upload audio file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('issue-audio')
      .getPublicUrl(filePath);

    // If issueId is provided, update the issue with the audio URL
    if (issueId) {
      const { error: updateError } = await supabase
        .from('issues')
        .update({ audio_url: publicUrl })
        .eq('id', issueId);

      if (updateError) {
        console.error('Error updating issue with audio URL:', updateError);
        // Continue anyway, as we still want to return the uploaded audio info
      }

      // Initiate transcription in the background
      try {
        // Call the transcribe-audio API endpoint
        const transcriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ai/transcribe-audio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audioUrl: publicUrl,
            issueId: issueId,
            language: 'en-US', // Default language
          }),
        });

        const transcriptionData = await transcriptionResponse.json();

        if (!transcriptionResponse.ok) {
          console.error('Error initiating transcription:', transcriptionData.error);
        }
      } catch (transcriptionError) {
        console.error('Error calling transcription API:', transcriptionError);
        // Continue anyway, as we still want to return the uploaded audio info
      }
    }

    // Return success response with file info
    return NextResponse.json({
      success: true,
      fileUrl: publicUrl,
      fileName: fileName,
      filePath: filePath,
      transcriptionInProgress: issueId ? true : false,
    });
  } catch (error) {
    console.error('Unexpected error in audio upload API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
