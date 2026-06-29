import { Student } from "@/types/student"
import AttendanceCell from "./AttendanceCell"

type AttendanceGridProps = {
  students: Student[]
  month: number
  year: number
  schoolClass: string
}

const AttendanceGrid = ({
  students,
  month,
  year,
  schoolClass,
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
    <div>
      <div className='bg-white rounded-lg shadow mt-6 overflow-auto'>
        <div className='p-4 '>
          <h2 className='text-lg font-semibold '>Attendance - {schoolClass}</h2>
        </div>

        <table className='w-full mt-4'>
          <thead className='border-b border-gray-200'>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='sticky left-0 bg-white border-b border-gray-200  text-sm text-center'>
                Student
              </th>

              {headers.map((item) => (
                <th
                  key={item.day}
                  className={` text-center min-w-12 border-b border-gray-200  text-sm ${
                    item.isSunday
                      ? "bg-red-50 text-red-600"
                      : item.isSaturday
                        ? "bg-yellow-50 text-yellow-700"
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
              <tr
                key={student.id}
                className='border-b border-gray-200  text-sm '>
                <td className='sticky left-0 bg-white border-b border-gray-200  text-sm  p-3 whitespace-nowrap'>
                  {student.firstName} {student.lastName}
                  <br />
                  <span className='text-xs'> {student.studentId}</span>
                </td>

                {dates.map((day) => (
                  <td
                    key={day}
                    className='border-b border-gray-200  text-sm  text-center'>
                    <AttendanceCell />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceGrid
