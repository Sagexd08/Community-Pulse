// Script to test Supabase connection
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test connection by getting the current timestamp from Supabase
    const { data, error } = await supabase
      .from('_test')
      .select('*')
      .limit(1);
    
    if (error) {
      // This error is expected if the _test table doesn't exist
      console.log('Connection test completed with expected error (table not found)');
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      // List all buckets to verify connection
      const { data: buckets, error: bucketsError } = await supabase
        .storage
        .listBuckets();
      
      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError);
      } else {
        console.log('Successfully connected to Supabase!');
        console.log('Available buckets:', buckets.map(b => b.name).join(', '));
      }
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('Test data:', data);
    }
  } catch (error) {
    console.error('Error testing connection:', error);
  }
}

// Run the test
testConnection();
