import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#0f0",
        border: "1px solid #0f0",
        padding: "8px 12px",
        fontSize: "11px",
        fontFamily: "monospace",
      }}
    >
      <div style={{ marginBottom: "4px", fontWeight: "bold" }}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i} style={{ color: entry.color }}>
          {entry.name}: {entry.value.toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default function Chart({ data, currency }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "#0f0",
        fontFamily: "monospace"
      }}>
        NO DATA AVAILABLE
      </div>
    );
  }

  // Calculate min/max for better scaling
  const allPrices = data.flatMap(d => [d.floor, d.avg]);
  const minPrice = Math.min(...allPrices) * 0.9;
  const maxPrice = Math.max(...allPrices) * 1.1;

  return (
    <div style={{ width: "100%", height: "100%", padding: "10px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 60, bottom: 5, left: 60 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(0, 255, 0, 0.1)" 
          />
          <XAxis
            dataKey="date"
            stroke="#0f0"
            axisLine={{ stroke: "#0f0" }}
            tickLine={{ stroke: "#0f0" }}
            tick={{
              fontSize: 10,
              fill: "#0f0",
              fontFamily: "monospace",
            }}
          />
          <YAxis
            yAxisId="left"
            stroke="#0f0"
            axisLine={{ stroke: "#0f0" }}
            tickLine={{ stroke: "#0f0" }}
            tick={{
              fontSize: 10,
              fill: "#0f0",
              fontFamily: "monospace",
            }}
            domain={[minPrice, maxPrice]}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#0f0"
            axisLine={{ stroke: "#0f0" }}
            tickLine={{ stroke: "#0f0" }}
            tick={{
              fontSize: 10,
              fill: "#0f0",
              fontFamily: "monospace",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: 10,
              fontFamily: "monospace",
              paddingTop: "10px",
            }}
            iconType="line"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="floor"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name={`Floor (${currency})`}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="avg"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name={`Avg (${currency})`}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="vol"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name={`Volume (${currency})`}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="count"
            stroke="#eab308"
            strokeWidth={2}
            dot={false}
            name="Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}