// Script to set up Supabase tables and functions
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to execute SQL directly using the REST API
async function executeSql(sql) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/execute_sql`,
      { sql },
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('SQL execution error:', error.response?.data || error.message);
    throw error;
  }
}

async function setupDatabase() {
  console.log('Setting up Supabase database...');

  try {
    // Create tables if they don't exist
    await createTables();

    // Create storage buckets
    await createStorageBuckets();

    // Create database functions
    await createDatabaseFunctions();

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

async function createTables() {
  console.log('Creating tables...');

  // We'll try to create all tables and handle errors if they already exist
  // First, let's create a helper function in the database
  try {
    await executeSql(`
      CREATE OR REPLACE FUNCTION create_table_if_not_exists(table_name text, table_definition text)
      RETURNS void
      LANGUAGE plpgsql
      AS $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = create_table_if_not_exists.table_name
        ) THEN
          EXECUTE format('CREATE TABLE %I (%s)', create_table_if_not_exists.table_name, create_table_if_not_exists.table_definition);
        END IF;
      END;
      $$;
    `);
    console.log('Created helper function for table creation');
  } catch (error) {
    console.error('Error creating helper function:', error);
    // Continue anyway, it might already exist
  }

  // Create transcriptions table
  console.log('Creating transcriptions table...');
  try {
    await executeSql(`
      SELECT create_table_if_not_exists('transcriptions', '
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        issue_id uuid,
        text text NOT NULL,
        confidence float NOT NULL,
        language text NOT NULL,
        segments jsonb,
        created_at timestamp with time zone DEFAULT now(),
        updated_at timestamp with time zone,
        metadata jsonb
      ');
    `);
    console.log('Transcriptions table created or already exists');
  } catch (error) {
    console.error('Error creating transcriptions table:', error);
  }

  // Create knowledge_base table
  console.log('Creating knowledge_base table...');
  try {
    await executeSql(`
      SELECT create_table_if_not_exists('knowledge_base', '
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        title text NOT NULL,
        content text NOT NULL,
        category text NOT NULL,
        tags text[],
        embedding jsonb,
        created_at timestamp with time zone DEFAULT now(),
        updated_at timestamp with time zone,
        source text,
        metadata jsonb
      ');
    `);
    console.log('Knowledge base table created or already exists');
  } catch (error) {
    console.error('Error creating knowledge_base table:', error);
  }

  // Create ai_models table
  console.log('Creating ai_models table...');
  try {
    await executeSql(`
      SELECT create_table_if_not_exists('ai_models', '
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text UNIQUE NOT NULL,
        type text NOT NULL,
        config jsonb NOT NULL,
        created_at timestamp with time zone DEFAULT now(),
        updated_at timestamp with time zone
      ');
    `);
    console.log('AI models table created or already exists');
  } catch (error) {
    console.error('Error creating ai_models table:', error);
  }
}

async function createStorageBuckets() {
  console.log('Creating storage buckets...');

  // Create issue-images bucket
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

  // Create issue-audio bucket
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

  // Create ai-models bucket
  const { data: modelsBucket, error: modelsError } = await supabase
    .storage
    .createBucket('ai-models', {
      public: true,
      fileSizeLimit: 104857600, // 100MB
    });

  if (modelsError && !modelsError.message.includes('already exists')) {
    console.error('Error creating ai-models bucket:', modelsError);
  } else {
    console.log('AI models bucket created or already exists');
  }
}

async function createDatabaseFunctions() {
  console.log('Creating database functions...');

  // Create helper function for function creation
  try {
    await executeSql(`
      CREATE OR REPLACE FUNCTION create_function_if_not_exists(function_name text, function_definition text)
      RETURNS void
      LANGUAGE plpgsql
      AS $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM information_schema.routines
          WHERE routine_schema = 'public'
          AND routine_name = create_function_if_not_exists.function_name
        ) THEN
          EXECUTE create_function_if_not_exists.function_definition;
        END IF;
      END;
      $$;
    `);
    console.log('Created helper function for function creation');
  } catch (error) {
    console.error('Error creating helper function:', error);
    // Continue anyway
  }

  // Create append_text function
  try {
    await executeSql(`
      CREATE OR REPLACE FUNCTION append_text(original_text text, new_text text)
      RETURNS text
      LANGUAGE plpgsql
      AS $$
      BEGIN
        IF original_text IS NULL THEN
          RETURN new_text;
        ELSE
          RETURN original_text || ' ' || new_text;
        END IF;
      END;
      $$;
    `);
    console.log('append_text function created successfully');
  } catch (error) {
    console.error('Error creating append_text function:', error);
  }

  // Create get_issue_description function
  try {
    await executeSql(`
      CREATE OR REPLACE FUNCTION get_issue_description(issue_id uuid)
      RETURNS text
      LANGUAGE plpgsql
      AS $$
      DECLARE
        issue_description text;
      BEGIN
        SELECT description INTO issue_description FROM issues WHERE id = issue_id;
        RETURN issue_description;
      EXCEPTION
        WHEN others THEN
          RETURN '';
      END;
      $$;
    `);
    console.log('get_issue_description function created successfully');
  } catch (error) {
    console.error('Error creating get_issue_description function:', error);
  }

  // Create match_documents function
  try {
    await executeSql(`
      CREATE OR REPLACE FUNCTION match_documents(query_embedding jsonb, match_threshold float, match_count int)
      RETURNS TABLE(
        id uuid,
        content text,
        similarity float
      )
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          knowledge_base.id,
          knowledge_base.content,
          0.5 as similarity  -- Placeholder similarity calculation
        FROM knowledge_base
        LIMIT match_count;
      END;
      $$;
    `);
    console.log('match_documents function created successfully');
  } catch (error) {
    console.error('Error creating match_documents function:', error);
  }
}

// Run the setup
setupDatabase();
