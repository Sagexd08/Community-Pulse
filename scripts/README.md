# Supabase Setup Instructions

This directory contains scripts to help set up your Supabase database for the Community Pulse application.

## Prerequisites

1. Make sure your `.env.local` file is properly configured with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://fkuzdgnidoiksdrulcav.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SUPABASE_JWT_SECRET=your-jwt-secret
   ```

## Setup Steps

### 1. Test Connection

First, test your connection to Supabase:

```bash
npm run test-connection
```

This should output a success message and list the available storage buckets.

### 2. Create Storage Buckets

Create the necessary storage buckets:

```bash
npm run create-buckets
```

This will create three buckets:
- `issue-images`: For storing issue-related images
- `issue-audio`: For storing audio recordings
- `ai-models`: For storing AI model files

### 3. Create Database Tables and Functions

To create the required database tables and functions, you need to run the SQL script in the Supabase SQL Editor:

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of `setup-tables.sql` from this directory
4. Paste it into the SQL Editor
5. Click "Run" to execute the SQL

This will create the following tables:
- `transcriptions`: For storing audio transcriptions
- `knowledge_base`: For storing RAG knowledge base entries
- `ai_models`: For storing AI model metadata

And the following functions:
- `append_text`: Helper function for appending text
- `get_issue_description`: Function to get issue descriptions
- `match_documents`: Function for RAG document matching

## Verification

After completing the setup, you can verify that everything is working correctly by running:

```bash
npm run test-connection
```

You should see a success message and the list of available storage buckets.

## Troubleshooting

If you encounter any issues:

1. Check that your Supabase credentials are correct in `.env.local`
2. Verify that you have the necessary permissions in your Supabase project
3. Check the Supabase dashboard for any error messages
4. Try running the SQL commands manually in the SQL Editor
