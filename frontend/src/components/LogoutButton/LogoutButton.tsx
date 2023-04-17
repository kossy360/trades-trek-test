'use client';

import ky from 'ky';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingButton } from '../LoadingButton/LoadingButton';

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);

    try {
      await ky.post('/api/logout');

      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton isLoading={isLoading} onClick={logout}>
      Logout
    </LoadingButton>
  );
};
