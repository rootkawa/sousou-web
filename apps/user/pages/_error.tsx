import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

function Error({ statusCode }: { statusCode: number }) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-900'>{statusCode || 'An error occurred'}</h1>
        <h2 className='mt-4 text-2xl font-semibold text-gray-700'>
          {statusCode === 404 ? 'Page Not Found' : 'Something went wrong!'}
        </h2>
        <p className='mt-2 text-gray-600'>
          {statusCode === 404
            ? "Sorry, we couldn't find the page you're looking for."
            : 'We encountered an unexpected error. Please try again.'}
        </p>
        <Button className='mt-6' asChild>
          <Link href='/'>Go back home</Link>
        </Button>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res?: any; err?: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
