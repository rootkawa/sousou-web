interface LoadingProps {
  loading?: boolean;
}

export default function Loading({ loading = true }: LoadingProps) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ${
        loading
          ? 'bg-background/95 pointer-events-auto opacity-100 backdrop-blur-[2px]'
          : 'pointer-events-none bg-transparent opacity-0 backdrop-blur-0'
      }`}
    >
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='relative mx-auto mb-4'>
            <div className='border-primary h-24 w-24 animate-spin rounded-full border-b-2 border-t-2'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <img
                src='loading.gif'
                alt='Loading'
                className='h-16 w-16 rounded-full object-cover'
              />
            </div>
          </div>
          <p className='text-muted-foreground text-lg'>Loading...</p>
        </div>
      </div>
    </div>
  );
}
