'use client';

import { NEXT_PUBLIC_CLARITY_PROJECT_ID } from '@/config/constants';
import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

export function ClarityAnalytics() {
  useEffect(() => {
    Clarity.init(NEXT_PUBLIC_CLARITY_PROJECT_ID);
  }, []);

  return null;
}
