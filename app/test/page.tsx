'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Community Pulse Test Page</h1>
      <p className="text-lg mb-8">
        This is a simple test page to verify that the deployment is working correctly.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="p-4 bg-green-100 rounded-lg">
          <h2 className="font-semibold text-green-800">Environment Variables:</h2>
          <p className="text-green-700">
            NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not Set'}
          </p>
          <p className="text-green-700">
            NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not Set'}
          </p>
        </div>
        <Button asChild className="mt-4">
          <Link href="/">Go to Home Page</Link>
        </Button>
      </div>
    </div>
  );
}
