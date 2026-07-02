import { Student } from "@/types/student"
import AttendanceCell from "./AttendanceCell"
import { Attendance } from "@/types/attendance"
import { Holiday } from "@/types/holiday"

type AttendanceGridProps = {
  role: "ADMIN" | "TEACHER" | "STUDENT" | "PARENT"
  students: Student[]
  attendance: Attendance[]
  holidays: Holiday[]
  month: number
  year: number
  schoolClass: string
}

const AttendanceGrid = ({
  role,
  students,
  attendance,
  holidays,
  month,
  year,
  schoolClass,
}: AttendanceGridProps) => {
  const totalDays = new Date(year, month + 1, 0).getDate()

  const headers = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(year, month, i + 1)

    return {
      day: i + 1,
      date,
      weekDay: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      isSunday: date.getDay() === 0,
      isSaturday: date.getDay() === 6,
    }
  })

  // Holiday lookup
  const holidayMap = new Map(
    holidays.map((holiday) => [new Date(holiday.date).getDate(), holiday]),
  )

  return (
    <div className='bg-white dark:bg-brand text-gray-400 rounded-lg shadow mt-6 overflow-auto'>
      <div className='p-4'>
        <h2 className='text-lg font-semibold'>{schoolClass}</h2>
      </div>

      <table className='w-full mt-4'>
        <thead className='border-b border-gray-200'>
          <tr className='text-left text-gray-500 text-sm'>
            <th className='sticky left-0 bg-white border-b border-gray-200 text-sm text-center'>
              Student
            </th>

            {headers.map((header) => {
              const holiday = holidayMap.get(header.day)

              return (
                <th
                  key={header.day}
                  className={`text-center min-w-12 border-b border-gray-200 text-sm ${
                    holiday
                      ? "bg-red-100 text-red-700"
                      : header.isSunday
                        ? "bg-red-50 text-red-600 dark:bg-red-600 dark:text-red-50"
                        : header.isSaturday
                          ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-50"
                          : ""
                  }`}>
                  <div className='text-xs'>{header.weekDay}</div>
                  <div className='font-semibold'>{header.day}</div>

                  {holiday && (
                    <div className='text-[10px] font-normal truncate px-1'>
                      {holiday.title}
                    </div>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className='sticky left-0 border-b border-gray-200 text-sm p-3 whitespace-nowrap bg-white dark:bg-brand'>
                {student.firstName} {student.lastName}
              </td>

              {headers.map((header) => {
                const attendanceRecord = attendance.find((item) => {
                  const attendanceDate = new Date(item.date)

                  return (
                    item.studentId === student.id &&
                    attendanceDate.getDate() === header.day
                  )
                })

                const holidayRecord = holidayMap.get(header.day)

                return (
                  <td
                    key={header.day}
                    className={`text-center border-b border-gray-200 text-sm ${
                      holidayRecord
                        ? "bg-red-50"
                        : header.isSunday
                          ? "bg-red-50"
                          : header.isSaturday
                            ? "bg-yellow-50"
                            : ""
                    }`}>
                    <AttendanceCell
                      studentId={student.id}
                      date={header.date}
                      status={attendanceRecord?.status}
                      holiday={holidayRecord}
                      role={role}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceGrid
