"use client";

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for emotion timeline
const emotionData = [
  { time: "0:00", happiness: 10, surprise: 5, sadness: 2, anger: 2, fear: 1 },
  { time: "5:00", happiness: 15, surprise: 10, sadness: 5, anger: 3, fear: 2 },
  { time: "10:00", happiness: 8, surprise: 12, sadness: 15, anger: 5, fear: 5 },
  { time: "15:00", happiness: 12, surprise: 8, sadness: 10, anger: 20, fear: 8 },
  { time: "20:00", happiness: 18, surprise: 5, sadness: 8, anger: 15, fear: 5 },
  { time: "25:00", happiness: 22, surprise: 3, sadness: 5, anger: 8, fear: 2 },
  { time: "30:00", happiness: 25, surprise: 5, sadness: 3, anger: 2, fear: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-3">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <div className="space-y-1 mt-1">
            {payload.map((entry: any, index: number) => (
              <p key={`item-${index}`} className="text-xs flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                <span>{`${entry.name}: ${entry.value}`}</span>
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export function EmotionTimeline() {
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
        <AreaChart
          data={emotionData}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorHappiness" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSurprise" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSadness" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAnger" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: 15 }} />
          <Area
            type="monotone"
            dataKey="happiness"
            name="Happiness"
            stackId="1"
            stroke="#10B981"
            fill="url(#colorHappiness)"
          />
          <Area
            type="monotone"
            dataKey="surprise"
            name="Surprise"
            stackId="1"
            stroke="#8B5CF6"
            fill="url(#colorSurprise)"
          />
          <Area
            type="monotone"
            dataKey="sadness"
            name="Sadness"
            stackId="1"
            stroke="#3B82F6"
            fill="url(#colorSadness)"
          />
          <Area
            type="monotone"
            dataKey="anger"
            name="Anger"
            stackId="1"
            stroke="#EF4444"
            fill="url(#colorAnger)"
          />
          <Area
            type="monotone"
            dataKey="fear"
            name="Fear"
            stackId="1"
            stroke="#F59E0B"
            fill="url(#colorFear)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}