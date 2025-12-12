'use client';
import { useEffect } from 'react';

export default function MSWProvider() {
  useEffect(() => {
    const enableMSW =
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_ENABLE_MSW === "true";

    if (enableMSW) {
      import("../mocks/browser").then(({ worker }) => {
        worker.start({
          onUnhandledRequest: "bypass",
          serviceWorker: { url: "/mockServiceWorker.js" },
        });
        console.log("[MSW] Worker started in browser");
      });
    }
  }, []);

  return null;
}




{/*'use client';
import { useEffect } from 'react';
export default function MSWProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("../mocks/browser").then(({ worker }) => {
        worker.start({
          onUnhandledRequest: "bypass",
          serviceWorker: {
            url: "/mockServiceWorker.js", 
          },
        });
        console.log("[MSW] Worker started in browser");
      });
    }
  }, []);

  return null;  
}*/
}