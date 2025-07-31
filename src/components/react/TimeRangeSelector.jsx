export default function TimeRangeSelector({ range, onSelect }) {
  const options = ["1W", "1M", "3M", "ALL"];
  return (
    <div className="flex gap-1">
      {options.map((label) => (
        <button
          key={label}
          className={`border px-2 py-1 text-xs font-bold transition hover:bg-green-700 hover:text-black ${
            range === label
              ? "bg-green-700 text-black border-green-700"
              : "text-green-400 border-green-700 bg-black"
          }`}
          onClick={() => onSelect(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}