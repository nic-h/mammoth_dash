import { useState, useMemo } from "react";
import Chart from "./Chart";
import TimeRangeSelector from "./TimeRangeSelector";
import CurrencyToggle from "./CurrencyToggle";

export default function ChartWrapper({ data }) {
  const [range, setRange] = useState("ALL");
  const [currency, setCurrency] = useState("TIA");
  const rate = 2.0;

  // Debug: Log when state changes
  console.log("Current range:", range);
  console.log("Current currency:", currency);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const now = Date.now();
    
    // Filter by time range
    let filtered = [...data];
    
    if (range !== "ALL") {
      const days = range === "1W" ? 7 : range === "1M" ? 30 : 90;
      const cutoffTime = now - (days * 24 * 60 * 60 * 1000);
      filtered = data.filter((d) => d.timestamp >= cutoffTime);
      console.log(`Filtered to ${range}: ${filtered.length} data points from ${data.length}`);
    }

    // Apply currency conversion
    const result = filtered.map((d) => {
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

    console.log("Processed data:", result.length, "points");
    return result;
  }, [data, range, currency]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b border-green-800">
        <CurrencyToggle currency={currency} setCurrency={setCurrency} />
        <TimeRangeSelector range={range} onSelect={setRange} />
      </div>
      <div className="flex-1 min-h-0">
        <Chart data={processedData} currency={currency} />
      </div>
    </div>
  );
}