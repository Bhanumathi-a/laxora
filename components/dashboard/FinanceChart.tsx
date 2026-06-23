"use client"
import { Ellipsis } from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 1800,
    amt: 2290,
  },
  {
    name: "April",
    income: 2780,
    expense: 3908,
    amt: 2000,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
    amt: 2181,
  },
  {
    name: "June",
    income: 2390,
    expense: 3800,
    amt: 2500,
  },
  {
    name: "July",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
]

const FinanceChart = () => {
  return (
    <div className='bg-white dark:bg-brand rounded-xl w-full h-full p-4'>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-semibold'>Fiance</div>
        <Ellipsis />
      </div>
      <div className='h-[75%] w-full relative'>
        <ResponsiveContainer width='100%' height='90%'>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#ddd' />
            <XAxis
              dataKey='name'
              axisLine={false}
              tick={{ fill: "#0d2440" }}
              tickLine={false}
              tickMargin={20}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#0d2440" }}
              tickLine={false}
            />
            <Tooltip />
            <Legend
              verticalAlign='top'
              align='center'
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
            />
            <Line
              type='monotone'
              dataKey='income'
              stroke='#2e5e99 '
              strokeWidth={3}
            />
            <Line
              type='monotone'
              dataKey='expense'
              stroke='#7ba4d0'
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceChart
