import { useState, useEffect } from "react";

export function useSafeFetch(url, deps = [], options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const runFetch = async () => {
      setLoading(true);
      try {
        let res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        let json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        console.warn(`[SafeFetch] First attempt failed for ${url}, retrying...`, err);
        try {
          await new Promise(r => setTimeout(r, 500));
          let res = await fetch(url, options);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          let json = await res.json();
          if (!cancelled) setData(json);
        } catch (retryErr) {
          if (!cancelled) setError(retryErr);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    runFetch();
    return () => { cancelled = true; };
  }, deps);

  return { data, error, loading };
}