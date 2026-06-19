import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import AttendanceTable from "@/components/dashboard/attendanceTable"

type Props = {
  params: Promise<{
    slug: string
  }>
}

const AttendanceList = async ({ params }: Props) => {
  const { slug } = await params
  const school = await prisma.school.findUnique({
    where: { slug },
  })

  if (!school) {
    return <div>School not found</div>
  }
  const students = await prisma.student.findMany({
    where: {
      schoolId: school.id,
    },
  })
  const attendance = await prisma.attendance.findMany({
    include: {
      student: true,
    },
  })
  // console.log(JSON.stringify(attendance, null, 2))
  const teachers = await prisma.teacher.findMany({
    where: {
      schoolId: school.id,
    },
  })

  return (
    <>
      <div className='h-screen flex'>
        <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />

        <div className='flex-1 overflow-auto bg-[#f7f8fa]  dark:bg-[#1e293b] '>
          <Header />
          <AttendanceTable
            initialAttendances={attendance}
            students={students}
            slug={slug}
          />
        </div>
      </div>
    </>
  )
}

export default AttendanceList
