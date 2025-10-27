import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// #region Sample data (January to December)
const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 1000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 1000, pv: 1800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Aug", uv: 3000, pv: 3000, amt: 2000 },
  { name: "Sep", uv: 2500, pv: 3200, amt: 2100 },
  { name: "Oct", uv: 2800, pv: 3500, amt: 2200 },
  { name: "Nov", uv: 3200, pv: 4000, amt: 2300 },
  { name: "Dec", uv: 3600, pv: 4200, amt: 2400 },
];
// #endregion

const SimpleBarChart = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "40vh",
        margin: "auto",
      }}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          barCategoryGap="30%"
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis width="auto" axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value / 1000}K Token Sold`,
              "",
            ]}
            labelFormatter={(label: string) => `${label} 2025`}
            contentStyle={{
              backgroundColor: "#222",
              color: "#fff",
              borderRadius: 6,
            }}
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
          />

          {/* <Legend /> */}
          <Bar
            dataKey="pv"
            fill="#FFC200A3"
            activeBar={<Rectangle fill="#FFC200" stroke="#FFC200" />}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
