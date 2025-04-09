'use client';

import { NEXT_PUBLIC_LIMITED_OFFER_END_DATE } from 'config/constants';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface LimitedTimeOfferProps {
  t: ReturnType<typeof useTranslations>;
}

export function LimitedTimeOffer({ t }: LimitedTimeOfferProps) {
  // Timer state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Parse the end date from environment variable (format: YYYYMMDD)
    const endDateStr = NEXT_PUBLIC_LIMITED_OFFER_END_DATE;

    // Parse YYYYMMDD format to a Date object
    const year = parseInt(endDateStr.substring(0, 4));
    const month = parseInt(endDateStr.substring(4, 6)) - 1; // 0-indexed months
    const day = parseInt(endDateStr.substring(6, 8));

    // Create date at the end of the specified day (23:59:59)
    const endDate = new Date(year, month, day, 23, 59, 59);

    // Function to update the timer
    const updateTimer = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        // Offer has expired
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Initial update
    updateTimer();

    // Set interval to update timer every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // Pad the number with leading zero if needed
  const padNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  // Don't render anything if expired or no time data yet
  if (isExpired || !timeLeft) return null;

  return (
    <div className='rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-1 py-0.5 text-xs text-white shadow-lg'>
      <div className='flex items-center justify-center'>
        {timeLeft.days > 0 && (
          <div className='flex items-center'>
            {padNumber(timeLeft.days)}
            <span className='text-[10px]'>{t('Day')}</span>
          </div>
        )}

        <div className='flex items-center'>
          {padNumber(timeLeft.hours)}
          <span className='text-[10px]'>{t('Hour')}</span>
        </div>

        <div className='flex items-center'>
          {padNumber(timeLeft.minutes)}
          <span className='text-[10px]'>{t('Minute')}</span>
        </div>

        <div className='flex items-center'>
          {padNumber(timeLeft.seconds)}
          <span className='text-[10px]'>{t('Second')}</span>
        </div>
      </div>
    </div>
  );
}
