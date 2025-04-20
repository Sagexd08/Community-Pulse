// Script to create Supabase storage buckets
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createStorageBuckets() {
  console.log('Creating storage buckets...');
  
  // Create issue-images bucket
  try {
    const { data: imagesBucket, error: imagesError } = await supabase
      .storage
      .createBucket('issue-images', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
      });
    
    if (imagesError && !imagesError.message.includes('already exists')) {
      console.error('Error creating issue-images bucket:', imagesError);
    } else {
      console.log('Issue images bucket created or already exists');
    }
  } catch (error) {
    console.error('Error creating issue-images bucket:', error);
  }
  
  // Create issue-audio bucket
  try {
    const { data: audioBucket, error: audioError } = await supabase
      .storage
      .createBucket('issue-audio', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg']
      });
    
    if (audioError && !audioError.message.includes('already exists')) {
      console.error('Error creating issue-audio bucket:', audioError);
    } else {
      console.log('Issue audio bucket created or already exists');
    }
  } catch (error) {
    console.error('Error creating issue-audio bucket:', error);
  }
  
  // Create ai-models bucket
  try {
    const { data: modelsBucket, error: modelsError } = await supabase
      .storage
      .createBucket('ai-models', {
        public: true,
        fileSizeLimit: 52428800, // 50MB (reduced from 100MB)
      });
    
    if (modelsError && !modelsError.message.includes('already exists')) {
      console.error('Error creating ai-models bucket:', modelsError);
    } else {
      console.log('AI models bucket created or already exists');
    }
  } catch (error) {
    console.error('Error creating ai-models bucket:', error);
  }
}

// Run the setup
createStorageBuckets();
