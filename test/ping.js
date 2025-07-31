const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const tokenAddress = "0xbE25A97896b9CE164a314C70520A4df55979a0c6";
const hosts = [
  "https://api.modularium.xyz",
  "https://api.forma.art",
  "https://modularium.art/api",
  "https://market.forma.art/api",
];

(async () => {
  for (const base of hosts) {
    const url = `${base}/collection/${tokenAddress}/stats`;
    try {
      const res = await fetch(url);
      const body = await res.text();
      console.log(`✅ ${base} → ${res.status}`);
      console.log(body);
    } catch (err) {
      console.log(`❌ ${base} → ${err.message}`);
    }
  }
})();
