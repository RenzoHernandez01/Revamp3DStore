
if (typeof window !== "undefined") {
  import("../mocks/browser").then(({ worker }) => {
    worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: { url: "/mockServiceWorker.js" },
    });
    console.log("[MSW] Worker started before React mount");
  });
}

{/*if (process.env.NODE_ENV === "development") {
  import("../mocks/browser").then(({ worker }) => {
    worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js", \
      },
    });
    console.log("[MSW] Worker started before React mount");
  });
}*/}
