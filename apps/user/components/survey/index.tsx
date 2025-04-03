'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@workspace/ui/components/alert-dialog';
import { useEffect, useRef, useState } from 'react';

interface SurveyRedirectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectUrl: string;
  t: (key: string, options?: any) => string;
}

export function SurveyRedirectDialog({
  open,
  onOpenChange,
  redirectUrl,
  t,
}: SurveyRedirectDialogProps) {
  const [redirectCountdown, setRedirectCountdown] = useState(15);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for countdown and automatic redirect
  useEffect(() => {
    if (!open) return;

    if (redirectCountdown > 0) {
      countdownTimerRef.current = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      // Time's up, redirect
      window.location.href = redirectUrl || '/dashboard';
    }

    return () => {
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, [open, redirectCountdown, redirectUrl]);

  // Handle manual redirect
  const handleManualRedirect = () => {
    window.location.href = redirectUrl || '/dashboard';
  };

  // Reset countdown when dialog is opened
  useEffect(() => {
    if (open) {
      setRedirectCountdown(15);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='border-primary/20 max-w-md overflow-hidden rounded-xl border-2 shadow-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle className='animate-fade-in from-primary/90 to-primary bg-gradient-to-r bg-clip-text text-center text-2xl font-bold tracking-tight text-transparent'>
            {t('survey.congratsTitle')} 🎉
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className='space-y-5 text-center'>
          <p className='animate-slide-up text-muted-foreground font-medium leading-relaxed'>
            {t('survey.description')}
          </p>

          <div className='mx-auto my-6 flex justify-center'>
            <img
              src='survey.gif'
              alt='Survey animation'
              className='h-36 w-auto rounded-lg object-cover shadow-md transition-all duration-300 hover:scale-105'
            />
          </div>

          <div className='bg-muted/80 relative mt-4 overflow-hidden rounded-lg p-3 text-center backdrop-blur'>
            <div className='from-primary/5 to-primary/10 absolute inset-0 bg-gradient-to-r opacity-30'></div>
            <span className='text-foreground relative font-medium'>
              {t('survey.redirecting', { seconds: redirectCountdown })}
              <span className='text-primary ml-1 inline-block animate-pulse'>⏱</span>
            </span>
          </div>
        </div>

        <AlertDialogFooter className='mt-2 flex justify-center sm:justify-center'>
          <AlertDialogAction
            onClick={handleManualRedirect}
            className='bg-primary hover:bg-primary/90 relative overflow-hidden px-8 py-2.5 text-lg font-medium transition-all duration-300 hover:shadow-md'
          >
            <span className='relative z-10'>{t('survey.continueButton')}</span>
            <span className='from-primary/90 to-primary absolute inset-0 bg-gradient-to-r transition-opacity duration-300 hover:opacity-100'></span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
