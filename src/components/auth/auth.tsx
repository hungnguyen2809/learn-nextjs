import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';
import Loading from '../Loading';

interface Props extends PropsWithChildren {}

export const Auth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      router.push('/login', undefined);
    }
  }, [firstLoading, profile, router]);

  if (!profile?.username) {
    return <Loading />;
  }

  return <div>{children}</div>;
};
