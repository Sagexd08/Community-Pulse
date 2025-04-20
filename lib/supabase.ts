import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Export Database type for type safety
export type { Database };

// Create a Supabase client for client-side operations
export const createClientSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// Note: For server-side operations, import from supabase-server.ts instead
