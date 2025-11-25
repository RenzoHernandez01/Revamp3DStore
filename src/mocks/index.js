// src/index.js (or wherever your app entry is)
export async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Worker started in browser');
  }
}

// Call it immediately in dev mode
if (process.env.NODE_ENV === 'development') {
  initMocks();
}