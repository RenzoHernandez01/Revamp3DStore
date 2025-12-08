if (process.env.NODE_ENV === "development") {
  import("../mocks/browser").then(({ worker }) => {
    worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js", // must exist in /public
      },
    });
    console.log("[MSW] Worker started before React mount");
  });
}
