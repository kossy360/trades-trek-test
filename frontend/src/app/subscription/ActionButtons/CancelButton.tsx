'use client';

import ky from 'ky';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingButton } from '../../../components/LoadingButton/LoadingButton';
import { IUserSubscriptionResponse } from '../../../types/user';

export const CancelButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');
  const router = useRouter();

  const subscribe = async () => {
    setIsLoading(true);
    setErrorTxt('');

    try {
      await ky.patch(`/api/subscribe/cancel`).json<IUserSubscriptionResponse>();

      router.refresh();
    } catch (error) {
      setErrorTxt('Unable to cancel subscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <LoadingButton className='bg-danger' isLoading={isLoading} onClick={subscribe}>
        Cancel
      </LoadingButton>
      <p>{errorTxt}</p>
    </div>
  );
};
