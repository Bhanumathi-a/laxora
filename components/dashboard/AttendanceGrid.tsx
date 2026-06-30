import { Student } from "@/types/student"
import AttendanceCell from "./AttendanceCell"

import { Attendance } from "@/types/attendance"

type AttendanceGridProps = {
  students: Student[]
  attendance: Attendance[]
  month: number
  year: number
  schoolClass: string
}

const AttendanceGrid = ({
  students,
  month,
  year,
  schoolClass,
  attendance,
}: AttendanceGridProps) => {
  const totalDays = new Date(year, month + 1, 0).getDate()
  const dates = Array.from({ length: totalDays }, (_, i) => i + 1)
  const headers = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(year, month, i + 1)

    return {
      day: i + 1,
      weekDay: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      isSunday: date.getDay() === 0,
      isSaturday: date.getDay() === 6,
    }
  })

  return (
    <>
      <div className='bg-white dark:bg-brand text-gray-400 rounded-lg shadow mt-6 overflow-auto'>
        <div className='p-4 '>
          <h2 className='text-lg font-semibold '>{schoolClass}</h2>
        </div>

        <table className='w-full mt-4'>
          <thead className='border-b border-gray-200'>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='sticky left-0  border-b border-gray-200  text-sm text-center'>
                Student
              </th>

              {headers.map((item) => (
                <th
                  key={item.day}
                  className={` text-center min-w-12 border-b border-gray-200  text-sm ${
                    item.isSunday
                      ? "bg-red-50 text-red-600 dark:bg-red-600 dark:text-red-50"
                      : item.isSaturday
                        ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-50"
                        : ""
                  } `}>
                  <div className='text-xs text-gray-500'>{item.weekDay}</div>

                  <div className='font-semibold'>{item.day}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className='sticky left-0  border-b border-gray-200  text-sm  p-3 whitespace-nowrap'>
                  {student.firstName} {student.lastName}
                </td>

                {dates.map((day) => {
                  const currentDate = new Date(year, month, day)
                  const currentDateString = currentDate
                    .toISOString()
                    .split("T")[0]

                  //   console.log(
                  //     "Student:",
                  //     student.studentId,
                  //     "Cell Day:",
                  //     day,
                  //     "Attendance:",
                  //     attendance,
                  //   )

                  const attendanceRecord = attendance.find((item) => {
                    const attendanceDate = new Date(item.date)

                    const match =
                      item.studentId === student.id &&
                      attendanceDate.getDate() === day

                    return match
                  })

                  return (
                    <td
                      key={day}
                      className='border-b border-gray-200 text-sm text-center'>
                      <AttendanceCell
                        studentId={student.id}
                        date={new Date(year, month, day)}
                        status={attendanceRecord?.status}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AttendanceGrid
