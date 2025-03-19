"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 145 },
  { month: "Mar", users: 162 },
  { month: "Apr", users: 190 },
  { month: "May", users: 210 },
  { month: "Jun", users: 245 },
  { month: "Jul", users: 270 },
  { month: "Aug", users: 290 },
  { month: "Sep", users: 320 },
  { month: "Oct", users: 355 },
  { month: "Nov", users: 390 },
  { month: "Dec", users: 420 },
]

export function UserGrowth() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

