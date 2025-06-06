"use client";

import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for voice analysis
const voiceData = [
  { time: "0:00", pitch: 40, volume: 55, pace: 60 },
  { time: "5:00", pitch: 45, volume: 60, pace: 65 },
  { time: "10:00", pitch: 60, volume: 75, pace: 50 },
  { time: "15:00", pitch: 70, volume: 80, pace: 40 },
  { time: "20:00", pitch: 55, volume: 65, pace: 55 },
  { time: "25:00", pitch: 50, volume: 60, pace: 60 },
  { time: "30:00", pitch: 45, volume: 55, pace: 65 },
];

// Mock data for vocal patterns
const vocalPatterns = [
  { pattern: "Rising Intonation", occurrences: 12, significance: "Question or uncertainty" },
  { pattern: "Falling Intonation", occurrences: 18, significance: "Confidence or certainty" },
  { pattern: "Vocal Fry", occurrences: 5, significance: "Fatigue or disinterest" },
  { pattern: "Increased Volume", occurrences: 8, significance: "Emphasis or excitement" },
  { pattern: "Decreased Volume", occurrences: 3, significance: "Hesitation or doubt" },
  { pattern: "Speech Rate Increase", occurrences: 6, significance: "Enthusiasm or nervousness" },
];

export function AudioAnalysis() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Voice Tone Analysis</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={voiceData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
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
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: 15 }} />
              <Line
                type="monotone"
                dataKey="pitch"
                name="Pitch"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="volume"
                name="Volume"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="pace"
                name="Pace"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Vocal Patterns</h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pattern</TableHead>
                  <TableHead className="text-right">Occurrences</TableHead>
                  <TableHead>Significance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vocalPatterns.map((pattern, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{pattern.pattern}</TableCell>
                    <TableCell className="text-right">{pattern.occurrences}</TableCell>
                    <TableCell>{pattern.significance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Speaker Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Client (Alex)</p>
                <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">35% speaking time</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Manager (Sam)</p>
                <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">65% speaking time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Emotional Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-sm">Confidence</p>
                  <p className="text-sm font-medium">High</p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-sm">Hesitation</p>
                  <p className="text-sm font-medium">Low</p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-sm">Engagement</p>
                  <p className="text-sm font-medium">High</p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}