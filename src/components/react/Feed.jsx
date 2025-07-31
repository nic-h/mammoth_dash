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
    .slice(0, 10) // Limit to 10 most recent
    .map((tx) => ({
      ...tx,
      price: typeof tx.price === 'string' ? Number(tx.price) / 1e18 : tx.price,
    }));

  if (recent.length === 0) {
    return <div className="text-xs opacity-50">NO RECENT ACTIVITY</div>;
  }

  return (
    <ul className="space-y-1 text-xs font-mono">
      {recent.map((tx, i) => (
        <li key={i} className="flex justify-between items-center py-0.5">
          <span className="text-green-600">#{tx.tokenId}</span>
          <span className="text-green-400">{tx.price.toFixed(2)} TIA</span>
          <span className="text-green-300 text-right">{timeAgo(tx.timestamp)}</span>
        </li>
      ))}
    </ul>
  );
}