'use client';
import { useEffect } from 'react';

export default function MSWProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../mocks/browser').then(({ worker }) => {
        worker.start({ onUnhandledRequest: 'bypass' });
        console.log('[MSW] Worker started in browser');
      });
    }
  }, []);

  return null;
}