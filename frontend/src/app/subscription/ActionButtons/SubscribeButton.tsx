'use client';

import ky from 'ky';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingButton } from '../../../components/LoadingButton/LoadingButton';
import { IUserSubscribeResponse } from '../../../types/user';

export const SubscribeButton = (props: { subscriptionId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');
  const router = useRouter();

  const subscribe = async () => {
    setIsLoading(true);
    setErrorTxt('');

    try {
      const res = await ky
        .patch(`/api/subscribe/${props.subscriptionId}`)
        .json<IUserSubscribeResponse>();

      if (res.data.url) {
        router.push(res.data.url);
      } else {
        router.refresh();
      }
    } catch (error) {
      setErrorTxt('Unable to subscribe user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <LoadingButton isLoading={isLoading} onClick={subscribe}>
        Subscribe
      </LoadingButton>
      <p>{errorTxt}</p>
    </div>
  );
};
