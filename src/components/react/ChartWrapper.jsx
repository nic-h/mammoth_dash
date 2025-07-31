import { useState } from "react";
import Chart from "./Chart";
import TimeRangeSelector from "./TimeRangeSelector";
import CurrencyToggle from "./CurrencyToggle";

export default function ChartWrapper({ data }) {
  const [range, setRange] = useState("ALL");
  const [currency, setCurrency] = useState("TIA");
  const rate = 2.0;

  const now = Date.now();

  const filtered = data.filter((d) => {
    const ts = d.timestamp || new Date(d.date).getTime();
    if (range === "1W") return now - ts <= 7 * 86400000;
    if (range === "1M") return now - ts <= 30 * 86400000;
    if (range === "3M") return now - ts <= 90 * 86400000;
    return true;
  });

  const mapped = filtered.map((d) => {
    if (currency === "USD") {
      return {
        ...d,
        floor: d.floor * rate,
        avg: d.avg * rate,
        vol: d.vol * rate,
      };
    }
    return d;
  });

  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center mb-2">
        <CurrencyToggle currency={currency} setCurrency={setCurrency} />
        <TimeRangeSelector range={range} onSelect={setRange} />
      </div>
      <div className="flex-1">
        <Chart data={mapped} currency={currency} />
      </div>
    </div>
  );
}
