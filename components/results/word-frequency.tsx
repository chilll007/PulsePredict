"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for word frequency
const wordData = [
  { word: "feature", frequency: 24 },
  { word: "product", frequency: 18 },
  { word: "timeline", frequency: 16 },
  { word: "budget", frequency: 14 },
  { word: "design", frequency: 12 },
  { word: "client", frequency: 10 },
  { word: "deadline", frequency: 9 },
  { word: "meeting", frequency: 7 },
];

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-3">
          <p className="text-sm font-medium">{`"${label}"`}</p>
          <p className="text-xs">{`Frequency: ${payload[0].value}`}</p>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export function WordFrequency() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={wordData}
          margin={{ top: 5, right: 5, left: 0, bottom: 40 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--muted))" />
          <XAxis
            type="number"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis
            type="category"
            dataKey="word"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="frequency" radius={[0, 4, 4, 0]}>
            {wordData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}