# Community Pulse Project Structure

## Frontend (Next.js)
- `/app` - Next.js app directory
- `/components` - React components
- `/contexts` - React context providers
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/styles` - CSS and styling files

## Backend (API Routes and Services)
- `/app/api` - Next.js API routes
- `/lib/ai` - AI services and utilities
- `/lib/supabase.ts` - Supabase client
- `/scripts` - Database setup scripts

## Shared
- `/types` - TypeScript type definitions
- `/middleware.ts` - Middleware for authentication
- `/next.config.mjs` - Next.js configuration
- `/tailwind.config.ts` - Tailwind CSS configuration
- `/tsconfig.json` - TypeScript configuration
- `/package.json` - Project dependencies

## Deployment
- `/.env.local` - Local environment variables
- `/.env.production` - Production environment variables
- `/vercel.json` - Vercel deployment configuration
