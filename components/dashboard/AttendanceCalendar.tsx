"use client"

import React, { useState } from "react"
import SelectField from "../forms/shared/SelectField"
import { SchoolClass } from "@/types/schoolClass"

import { Student } from "@/types/student"
import AttendanceGrid from "./AttendanceGrid"

type AttendanceCalendarProps = {
  classes: SchoolClass[]
  students: Student[]
  slug: string
}
const AttendanceCalendar = ({
  classes,
  slug,
  students,
}: AttendanceCalendarProps) => {
  const [selectedClass, setSelectedClass] = useState("")
  const filteredStudents = students.filter(
    (student) => student.classId === selectedClass,
  )

  const classOptions = classes.map((cls) => ({
    value: cls.id,
    label: `${cls.name} - ${cls.section}`,
  }))

  const currentClass = classes.find((cls) => cls.id === selectedClass)

  const today = new Date()

  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const monthName = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <div>
        <div className='flex my-4'>
          <div className=' text-lg font-semibold  '>Attendance</div>
        </div>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className='border rounded-lg p-2  w-full lg:w-1/5'>
          <option value=''>Select Class</option>

          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} - {cls.section}
            </option>
          ))}
        </select>
      </div>
      <h3 className=' text-center font-medium text-gray-600 ml-4'>
        {monthName}
      </h3>
      <p className='text-gray-500 pt-2'>
        {!currentClass && (
          <div className='mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500'>
            Please select a class to view attendance.
          </div>
        )}
      </p>

      {currentClass && (
        <AttendanceGrid
          students={filteredStudents}
          month={month}
          year={year}
          schoolClass={
            currentClass ? `${currentClass.name} - ${currentClass.section}` : ""
          }
        />
      )}
    </>
  )
}

export default AttendanceCalendar
