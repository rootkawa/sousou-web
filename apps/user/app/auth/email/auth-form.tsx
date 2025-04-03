'use client';

import { resetPassword, userLogin, userRegister } from '@/services/common/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ReactNode, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { SurveyRedirectDialog } from '@/components/survey';
import {
  NEXT_PUBLIC_DEFAULT_USER_EMAIL,
  NEXT_PUBLIC_DEFAULT_USER_PASSWORD,
  NEXT_PUBLIC_SURVEY_URL,
} from '@/config/constants';
import { getRedirectUrl, setAuthorization } from '@/utils/common';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import ResetForm from './reset-form';

export default function EmailAuthForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [type, setType] = useState<'login' | 'register' | 'reset'>('login');
  const [loading, startTransition] = useTransition();
  const [initialValues, setInitialValues] = useState<{
    email?: string;
    password?: string;
  }>({
    email: NEXT_PUBLIC_DEFAULT_USER_EMAIL || '',
    password: NEXT_PUBLIC_DEFAULT_USER_PASSWORD || '',
  });
  const [showRedirectAlert, setShowRedirectAlert] = useState(false);

  const handleFormSubmit = async (params: any) => {
    const onLogin = async (token?: string) => {
      if (!token) return;
      setAuthorization(token);
      router.replace(getRedirectUrl());
      router.refresh();
    };
    startTransition(async () => {
      try {
        switch (type) {
          case 'login': {
            const login = await userLogin(params);
            toast.success(t('login.success'));
            onLogin(login.data.data?.token);
            break;
          }
          case 'register': {
            const create = await userRegister(params);
            toast.success(t('register.success'));

            // Get token from response
            const token = create.data.data?.token;

            // Only proceed if we have a valid token (registration succeeded)
            if (!token) {
              toast.error(t('register.tokenError') || 'Registration failed, please try again');
              break;
            }

            // Store token for authentication
            setAuthorization(token);

            // Show the survey dialog
            setShowRedirectAlert(true);
            break;
          }
          case 'reset':
            await resetPassword(params);
            toast.success(t('reset.success'));
            setType('login');
            break;
        }
      } catch (error) {
        /* empty */
      }
    });
  };

  let UserForm: ReactNode = null;
  switch (type) {
    case 'login':
      UserForm = (
        <LoginForm
          loading={loading}
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          onSwitchForm={setType}
        />
      );
      break;
    case 'register':
      UserForm = (
        <RegisterForm
          loading={loading}
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          onSwitchForm={setType}
        />
      );
      break;
    case 'reset':
      UserForm = (
        <ResetForm
          loading={loading}
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          onSwitchForm={setType}
        />
      );
      break;
  }

  return (
    <>
      {UserForm}
      <SurveyRedirectDialog
        open={showRedirectAlert}
        onOpenChange={setShowRedirectAlert}
        redirectUrl={NEXT_PUBLIC_SURVEY_URL || '/dashboard'}
        t={t}
      />
    </>
  );
}
