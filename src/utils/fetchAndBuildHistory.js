import fs from "fs/promises";
import path from "path";

// Load local mock activity
const ACTIVITY_PATH = path.resolve("src/data/activity.json");
const OUTPUT_PATH = path.resolve("src/data/history.json");

const raw = await fs.readFile(ACTIVITY_PATH, "utf-8");
const events = JSON.parse(raw);

// Only use TAKE + SELL events (mock assumes all are valid)
const filtered = events.filter((e) => e.price && e.timestamp && e.tokenId);

// Group by day
const buckets = {};

for (const tx of filtered) {
  const date = new Date(tx.timestamp * 1000).toISOString().split("T")[0];
  if (!buckets[date]) buckets[date] = [];
  buckets[date].push(tx);
}

// Aggregate per day
const history = {};

for (const date in buckets) {
  const txs = buckets[date];
  const prices = txs.map((t) => t.price);

  const sum = prices.reduce((a, b) => a + b, 0);
  const avg = sum / prices.length;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const vol = sum;
  const count = prices.length;

  history[date] = {
    floor: min,
    avg: avg,
    vol: vol,
    count: count
  };
}

// Write to file
await fs.writeFile(OUTPUT_PATH, JSON.stringify(history, null, 2));
console.log("✅ history.json written");
