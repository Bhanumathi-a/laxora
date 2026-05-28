"use client"

import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

import { format, parse, startOfWeek, getDay } from "date-fns"

import { enUS } from "date-fns/locale"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: "Math Class",
    start: new Date(2026, 4, 28, 10, 0),
    end: new Date(2026, 4, 28, 11, 0),
  },
  {
    title: "Science Exam",
    start: new Date(2026, 4, 29, 12, 0),
    end: new Date(2026, 4, 29, 13, 0),
  },
]

const ScheduleCalendar = () => {
  return (
    <div className='h-[700px] bg-white p-4 rounded-xl'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={["month", "week", "day"]}
      />
    </div>
  )
}

export default ScheduleCalendar
