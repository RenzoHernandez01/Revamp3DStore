// src/index.js (or wherever your app entry is)
/*export async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Worker started in browser');
  }
}

// Call it immediately in dev mode
if (process.env.NODE_ENV === 'development') {
  initMocks();
}*/

// src/index.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
 
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
 
enableMocking().then(() => {
  ReactDOM.render(<App />, rootElement)
})