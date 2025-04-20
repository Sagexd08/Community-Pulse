// Script to test Supabase API integration
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testApi() {
  console.log('Testing Supabase API integration...');
  
  try {
    // Test creating a knowledge base entry
    const { data: knowledgeEntry, error: knowledgeError } = await supabase
      .from('knowledge_base')
      .insert({
        title: 'Test Knowledge Entry',
        content: 'This is a test entry for the knowledge base.',
        category: 'test',
        tags: ['test', 'api', 'integration'],
        embedding: { values: [0.1, 0.2, 0.3] },
        source: 'API Test',
        metadata: { test: true }
      })
      .select()
      .single();
    
    if (knowledgeError) {
      console.error('Error creating knowledge base entry:', knowledgeError);
    } else {
      console.log('Successfully created knowledge base entry:', knowledgeEntry.id);
      
      // Clean up the test entry
      const { error: deleteError } = await supabase
        .from('knowledge_base')
        .delete()
        .eq('id', knowledgeEntry.id);
      
      if (deleteError) {
        console.error('Error deleting test entry:', deleteError);
      } else {
        console.log('Successfully deleted test entry');
      }
    }
    
    // Test storage API
    const { data: signedUrl, error: signedUrlError } = await supabase
      .storage
      .from('issue-images')
      .createSignedUrl('test.jpg', 60);
    
    if (signedUrlError) {
      console.error('Error creating signed URL:', signedUrlError);
    } else {
      console.log('Successfully created signed URL (this is expected to fail if test.jpg doesn\'t exist)');
    }
    
    console.log('API integration test completed');
  } catch (error) {
    console.error('Error testing API integration:', error);
  }
}

// Run the test
testApi();
