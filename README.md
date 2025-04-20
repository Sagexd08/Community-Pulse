# Community Pulse

Community Pulse is a platform that uses AI and geospatial technology to help underrepresented communities report and resolve local issues effectively.

## Features

- **Supabase Integration**: Backend database and authentication
- **AI Agent Integration**: Using n8n for workflow automation
- **LSTM Image Classification**: AI-powered image analysis for issue categorization with model saving/loading
- **LLM Integration**: Real-time suggestions and sentiment analysis using Google's Gemini with RAG
- **Multi-modal Content Handling**: Support for text, image, and audio uploads with voice-to-text transcription
- **Story Editor**: AI-assisted story writing with contextual suggestions

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or pnpm
- Supabase account
- n8n instance
- Google Gemini API key

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# n8n Configuration
N8N_WEBHOOK_URL=your-n8n-webhook-url

# Google Gemini API
GOOGLE_GEMINI_API_KEY=your-gemini-api-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase Setup

1. Create a new Supabase project
2. Set up the following tables in your Supabase database:
   - users
   - issues
   - ai_analysis
   - contact_messages
   - stories
   - transcriptions
   - knowledge_base
   - ai_models
3. Enable Storage and create the following buckets:
   - issue-images
   - issue-audio
   - ai-models
4. Set up appropriate storage policies to allow authenticated users to upload files
5. Run the SQL script in `scripts/setup-tables.sql` to create the necessary tables and functions
6. Run `npm run create-buckets` to create the storage buckets

### n8n Setup

1. Install and run n8n locally or use a hosted instance
2. Import the workflows from:
   - `n8n-workflows/contact-callback-workflow.json`
   - `n8n-workflows/issue-processing-workflow.json`
   - `n8n-workflows/audio-transcription-workflow.json`
3. Configure the Twilio and SMTP credentials in n8n
4. Activate the workflows and copy the webhook URLs to your `.env.local` file

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Usage

### Contact Form with Callback

The contact form allows users to submit inquiries and request callbacks. When a callback is requested:

1. The form data is saved to Supabase
2. The n8n workflow is triggered
3. An SMS confirmation is sent to the user
4. A notification email is sent to the support team
5. The contact record is updated in Supabase

### Issue Reporting

Users can report community issues through:

1. Text descriptions
2. Image uploads
3. Audio recordings

When an issue is submitted:

1. The data is saved to Supabase
2. Images are analyzed using the LSTM model
3. Text is analyzed for sentiment using Gemini
4. AI-generated suggestions are provided

### Story Editor

The story editor allows users to:

1. Write stories based on captions
2. Get AI-generated suggestions for continuing their stories
3. Save and manage their stories

## AI Components

### LSTM Image Classification

The enhanced LSTM model analyzes uploaded images to categorize community issues, with model saving/loading capabilities and transfer learning. Categories include:

- Infrastructure damage
- Flooding
- Trash accumulation
- Graffiti
- Potholes
- Broken streetlights
- Fallen trees
- Other

### Gemini Integration

Google's Gemini AI is used for:

1. Sentiment analysis of issue descriptions with RAG (Retrieval Augmented Generation)
2. Generating helpful suggestions for addressing issues based on similar past issues
3. Creating story continuations based on context
4. Embedding generation for knowledge base entries

## Development

### Project Structure

- `/app`: Next.js app router pages
- `/components`: React components
- `/lib`: Utility functions and services
- `/lib/ai`: AI model implementations
  - `/lib/ai/lstm-image-classifier.ts`: LSTM model for image classification
  - `/lib/ai/gemini-client.ts`: Gemini API client
  - `/lib/ai/rag-knowledge-base.ts`: RAG implementation for sentiment analysis
  - `/lib/ai/speech-recognition.ts`: Speech recognition service
- `/lib/supabase.ts`: Supabase client configuration
- `/n8n-workflows`: n8n workflow configurations
- `/scripts`: Setup and utility scripts

### Adding New Features

To add new features:

1. Create new components in the `/components` directory
2. Add new API routes in the `/app/api` directory
3. Update the database schema in `/lib/database.types.ts`
4. Add new AI models in the `/lib/ai` directory

## License

This project is licensed under the MIT License.