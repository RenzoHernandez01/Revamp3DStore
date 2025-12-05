export async function safeFetch(url, options = {}) {
  try {
    let res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[SafeFetch] First attempt failed for ${url}, retrying...`, err);
    await new Promise(r => setTimeout(r, 500));
    let res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }
}