"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Strength", completed: 85, target: 100 },
  { name: "Cardio", completed: 65, target: 100 },
  { name: "HIIT", completed: 90, target: 100 },
  { name: "Yoga", completed: 75, target: 100 },
  { name: "Pilates", completed: 60, target: 100 },
  { name: "CrossFit", completed: 80, target: 100 },
]

export function ActivityMetrics() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" name="Completion Rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="target" name="Target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

