import { mockAppeals, categoryLabels, categoryColors, districts, AppealCategory } from "@/data/appeals";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  const categoryData = Object.entries(categoryLabels).map(([key, label]) => ({
    name: label,
    count: mockAppeals.filter((a) => a.category === key).length,
    color: categoryColors[key as AppealCategory],
  }));

  const districtData = districts.map((d) => ({
    name: d.replace("ский", "ск.").replace("инский", "инск."),
    count: mockAppeals.filter((a) => a.district === d).length,
  }));

  const statusData = [
    { name: "Новые", count: mockAppeals.filter((a) => a.status === "new").length, color: "#3b82f6" },
    { name: "В работе", count: mockAppeals.filter((a) => a.status === "in_progress").length, color: "#f59e0b" },
    { name: "Решены", count: mockAppeals.filter((a) => a.status === "resolved").length, color: "#22c55e" },
    { name: "Отклонены", count: mockAppeals.filter((a) => a.status === "rejected").length, color: "#ef4444" },
  ];

  const totalVotes = mockAppeals.reduce((s, a) => s + a.votes, 0);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Всего обращений", value: mockAppeals.length, accent: "text-primary" },
          { label: "Новых", value: mockAppeals.filter((a) => a.status === "new").length, accent: "text-info" },
          { label: "В работе", value: mockAppeals.filter((a) => a.status === "in_progress").length, accent: "text-warning" },
          { label: "Голосов", value: totalVotes, accent: "text-success" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className={`text-2xl font-bold ${stat.accent}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* By category pie chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">По категориям</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={85} strokeWidth={2} stroke="hsl(220,25%,12%)">
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220,25%,14%)", border: "1px solid hsl(220,20%,20%)", borderRadius: "8px", color: "#e2e8f0" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {categoryData.filter(c => c.count > 0).map((c) => (
              <span key={c.name} className="text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: c.color }} />
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* By district bar chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">По районам</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={districtData} margin={{ left: -10 }}>
              <XAxis dataKey="name" tick={{ fill: "hsl(215,15%,55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215,15%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220,25%,14%)", border: "1px solid hsl(220,20%,20%)", borderRadius: "8px", color: "#e2e8f0" }}
              />
              <Bar dataKey="count" fill="hsl(217,91%,60%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status distribution */}
        <div className="glass-card p-5 md:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Статус обращений</h3>
          <div className="flex gap-4 items-end h-32">
            {statusData.map((s) => (
              <div key={s.name} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-lg font-bold" style={{ color: s.color }}>{s.count}</span>
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${Math.max((s.count / mockAppeals.length) * 100, 10)}%`,
                    backgroundColor: s.color,
                    opacity: 0.8,
                  }}
                />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
