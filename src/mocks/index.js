// src/mocks/index.js
import { worker } from './browser';


export async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Worker started in browser');
  }
}
