"use client"
import { Ellipsis } from "lucide-react"
import Image from "next/image"
import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Mon",
    present: 20,
    absent: 10,
  },
  {
    name: "Tue",
    present: 20,
    absent: 10,
  },
  {
    name: "Wed",
    present: 20,
    absent: 10,
  },
  {
    name: "Thu",
    present: 20,
    absent: 10,
  },
  {
    name: "Fri",
    present: 40,
    absent: 30,
  },
  {
    name: "Sat",
    present: 20,
    absent: 10,
  },
]

const AttendanceChart = () => {
  return (
    <div className='w-full bg-white rounded-xl h-[450px] p-4'>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-semibold'>Attendance</div>
        <Ellipsis />
      </div>
      <ResponsiveContainer width='100%' height='90%'>
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#ddd' />
          <XAxis
            dataKey='name'
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            verticalAlign='top'
            align='left'
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey='absent'
            fill='#7ba4d0'
            legendType='circle'
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey='present'
            fill='#2e5e99'
            legendType='circle'
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart
