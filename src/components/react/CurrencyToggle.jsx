export default function CurrencyToggle({ currency, setCurrency }) {
  return (
    <div className="flex gap-1">
      {["TIA", "USD"].map((unit) => (
        <button
          key={unit}
          onClick={() => setCurrency(unit)}
          className={`border px-2 py-1 text-xs font-bold transition ${
            currency === unit
              ? "bg-green-700 text-black border-green-700"
              : "text-green-400 border-green-700"
          }`}
        >
          {unit}
        </button>
      ))}
    </div>
  );
}
