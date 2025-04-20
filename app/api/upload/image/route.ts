import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-server';
import { v4 as uuidv4 } from 'uuid';

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
      .from('issue-images')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (storageError) {
      console.error('Error uploading file:', storageError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('issue-images')
      .getPublicUrl(filePath);

    // If issueId is provided, update the issue with the image URL
    if (issueId) {
      const { error: updateError } = await supabase
        .from('issues')
        .update({ image_url: publicUrl })
        .eq('id', issueId);

      if (updateError) {
        console.error('Error updating issue with image URL:', updateError);
        // Continue anyway, as we still want to return the uploaded image info
      }
    }

    // Return success response with file info
    return NextResponse.json({
      success: true,
      fileUrl: publicUrl,
      fileName: fileName,
      filePath: filePath,
    });
  } catch (error) {
    console.error('Unexpected error in image upload API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
