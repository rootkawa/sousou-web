'use client';

import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-900 dark:text-gray-100'>500</h1>
        <h2 className='mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300'>
          Something went wrong!
        </h2>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          We encountered an unexpected error. Please try again.
        </p>
        <div className='mt-6 flex justify-center gap-4'>
          <Button onClick={reset}>Try again</Button>
          <Button variant='outline' asChild>
            <Link href='/'>Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
