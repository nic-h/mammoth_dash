import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#0f0",
        border: "1px solid #0f0",
        padding: "6px 10px",
        fontSize: "12px",
        fontFamily: "monospace",
      }}
    >
      <div style={{ marginBottom: "4px", fontWeight: "bold" }}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i}>
          {entry.name}:{" "}
          <span style={{ color: "#fff" }}>{entry.value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default function Chart({ data, currency }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="date"
            stroke="#0f0"
            axisLine={{ stroke: "#0f0" }}
            tickLine={{ stroke: "#0f0" }}
            tick={{
              fontSize: 12,
              fill: "#0f0",
              fontFamily: "monospace",
            }}
          />
          <YAxis
            stroke="#0f0"
            axisLine={{ stroke: "#0f0" }}
            tickLine={{ stroke: "#0f0" }}
            tick={{
              fontSize: 12,
              fill: "#0f0",
              fontFamily: "monospace",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "#0f0",
            }}
          />
          <Line
            type="monotone"
            dataKey="floor"
            stroke="#22c55e"
            strokeWidth={1}
            dot={false}
            name={`Floor (${currency})`}
          />
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#3b82f6"
            strokeWidth={1}
            dot={false}
            name={`Avg (${currency})`}
          />
          <Line
            type="monotone"
            dataKey="vol"
            stroke="#ef4444"
            strokeWidth={1}
            dot={false}
            name={`Vol (${currency})`}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#eab308"
            strokeWidth={1}
            dot={false}
            name="Sales Count"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
