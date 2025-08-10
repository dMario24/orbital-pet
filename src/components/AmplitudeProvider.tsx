'use client';

import { useEffect } from 'react';
import { initAmplitude } from '@/lib/amplitude';

export default function AmplitudeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initAmplitude();
  }, []);

  return <>{children}</>;
}
