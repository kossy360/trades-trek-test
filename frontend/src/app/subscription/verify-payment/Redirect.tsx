'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Redirect = () => {
  const { replace } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      replace('/subscription');
    }, 3000);
  }, [replace]);

  return null;
};
