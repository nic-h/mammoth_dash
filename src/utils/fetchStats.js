export async function getCollectionStats(tokenAddress) {
    const url = `https://api.modularium.xyz/collection/${tokenAddress}/stats`;
  
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("Stats fetch failed:", err);
      return null;
    }
  }
  