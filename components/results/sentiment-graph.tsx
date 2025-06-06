"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for sentiment analysis
const sentimentData = [
  { time: "0:00", positive: 30, negative: 10, neutral: 60 },
  { time: "5:00", positive: 40, negative: 20, neutral: 40 },
  { time: "10:00", positive: 35, negative: 35, neutral: 30 },
  { time: "15:00", positive: 45, negative: 15, neutral: 40 },
  { time: "20:00", positive: 55, negative: 10, neutral: 35 },
  { time: "25:00", positive: 50, negative: 25, neutral: 25 },
  { time: "30:00", positive: 60, negative: 10, neutral: 30 },
];

// Mock data for sentiment timeline
const sentimentTimeline = [
  { time: "0:00", sentiment: 20 },
  { time: "5:00", sentiment: 40 },
  { time: "10:00", sentiment: 30 },
  { time: "15:00", sentiment: 50 },
  { time: "20:00", sentiment: 70 },
  { time: "25:00", sentiment: 60 },
  { time: "30:00", sentiment: 80 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-3">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}${entry.name === "sentiment" ? "" : "%"}`}
            </p>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export function SentimentGraph() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tabs defaultValue="distribution">
      <TabsList className="mb-4">
        <TabsTrigger value="distribution">Sentiment Distribution</TabsTrigger>
        <TabsTrigger value="timeline">Sentiment Timeline</TabsTrigger>
      </TabsList>

      <TabsContent value="distribution">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={sentimentData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 15 }} />
              <Area
                type="monotone"
                dataKey="positive"
                name="Positive"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorPositive)"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                name="Neutral"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorNeutral)"
              />
              <Area
                type="monotone"
                dataKey="negative"
                name="Negative"
                stroke="hsl(var(--chart-3))"
                fillOpacity={1}
                fill="url(#colorNegative)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="timeline">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sentimentTimeline}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="sentiment"
                name="Sentiment"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--chart-4))" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
}