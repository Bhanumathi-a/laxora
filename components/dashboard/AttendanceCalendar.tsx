"use client"

import React, { useEffect, useState } from "react"
import { SchoolClass } from "@/types/schoolClass"
import { Student } from "@/types/student"
import AttendanceGrid from "./AttendanceGrid"
import { Subject } from "@/types/subject"
import { Attendance } from "@/types/attendance"

type AttendanceCalendarProps = {
  classes: SchoolClass[]
  students: Student[]

  subjects: Subject[]
}
const AttendanceCalendar = ({
  classes,

  students,
  subjects,
}: AttendanceCalendarProps) => {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [attendance, setAttendance] = useState<Attendance[]>([])

  useEffect(() => {
    if (!selectedClass) return

    async function loadAttendance() {
      const res = await fetch(
        `/api/attendance?classId=${selectedClass}&month=${selectedMonth}&year=${selectedYear}`,
      )
      if (!res.ok) {
        console.error("Failed to load attendance")
        return
      }
      const data = await res.json()
      setAttendance(data)
      console.log(data)
    }

    loadAttendance()
  }, [selectedClass, selectedMonth, selectedYear])

  const filteredStudents = React.useMemo(
    () => students.filter((student) => student.classId === selectedClass),
    [students, selectedClass],
  )

  const currentClass = classes.find((cls) => cls.id === selectedClass)

  const monthName = new Date(selectedYear, selectedMonth).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  )

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const subjectOptions = subjects.map((subject) => ({
    value: subject.id,
    label: subject.name,
  }))

  return (
    <>
      <div>
        <div className='flex my-4'>
          <div className=' text-lg font-semibold  '>Attendance</div>
        </div>
        <div className='flex my-4 gap-4'>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className='border rounded-lg p-2  w-full lg:w-1/5 bg-white dark:bg-brand text-gray-500'>
            <option value=''>Select Class</option>

            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className='border rounded-lg p-2  w-full lg:w-1/5 bg-white dark:bg-brand text-gray-500'>
            <option value=''>Select Subject</option>

            {subjectOptions.map((sub) => (
              <option key={sub.label} value={sub.value}>
                {sub.label}
              </option>
            ))}
          </select>
          {selectedClass && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className='border rounded-lg p-2  w-full lg:w-1/5 bg-white dark:bg-brand text-gray-500'>
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <h3 className=' text-center font-medium text-gray-600 ml-4'>
        {monthName}
      </h3>

      {!currentClass && (
        <div className='mt-6 rounded-lg border border-dashed bg-white dark:bg-brand border-gray-300 bg-white p-10 text-center text-gray-500'>
          Please select a class to view attendance.
        </div>
      )}

      {currentClass && (
        <AttendanceGrid
          students={filteredStudents}
          attendance={attendance}
          month={selectedMonth}
          year={selectedYear}
          schoolClass={`${currentClass.name} - ${currentClass.section}`}
        />
      )}
    </>
  )
}

export default AttendanceCalendar
