"use client"
import { Ellipsis, FileText, PersonStanding } from "lucide-react"
import Image from "next/image"
import React from "react"
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "total",
    count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    count: 45,
    fill: "#2e5e99",
  },
  {
    name: "Boys",
    count: 55,
    fill: "#7ba4d0",
  },
]

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-semibold'>Student</div>
        <Ellipsis />
      </div>
      <div className='h-[75%] w-full relative'>
        <ResponsiveContainer>
          <RadialBarChart
            cx='50%'
            cy='50%'
            innerRadius='40%'
            outerRadius='100%'
            barSize={32}
            data={data}>
            <RadialBar background dataKey='count' />
          </RadialBarChart>
        </ResponsiveContainer>
        <FileText className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand' />
      </div>
      <div className='flex justify-center items-center gap-16'>
        <div className='flex  flex-col   gap-1 '>
          <div className='w-5 h-5 bg-vsSky rounded-full'></div>
          <h3 className='font-bold'>1234</h3>
          <h4 className='text-sm text-blue-light'>Boys (55%)</h4>
        </div>
        <div className='flex  flex-col   gap-1 '>
          <div className='w-5 h-5 bg-vsSky rounded-full'></div>
          <h3 className='font-bold'>1234</h3>
          <h4 className='text-sm text-blue-main'>girls (45%)</h4>
        </div>
      </div>
    </div>
  )
}

export default CountChart
