function timeAgo(ts) {
  const seconds = Math.floor(Date.now() / 1000) - ts;
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function Feed({ data }) {
  const recent = data
    .filter((tx) => Date.now() / 1000 - tx.timestamp <= 3 * 86400)
    .map((tx) => ({
      ...tx,
      price: Number(tx.price) / 1e18,
    }));

  return (
    <ul className="space-y-1 text-sm">
      {recent.map((tx, i) => (
        <li key={i} className="flex justify-between border-b border-green-700 py-1">
          <span>#{tx.tokenId}</span>
          <span>{tx.price.toFixed(2)} TIA</span>
          <span>{timeAgo(tx.timestamp)}</span>
        </li>
      ))}
    </ul>
  );
}
