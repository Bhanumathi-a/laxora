import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"

import AttendanceCalendar from "@/components/dashboard/AttendanceCalendar"
import AttendanceGrid from "@/components/dashboard/AttendanceGrid"
import { SearchBox } from "@/components/ui/SearchBox"

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

  const classes = await prisma.class.findMany({
    where: {
      schoolId: school.id,
    },
    orderBy: [{ name: "asc" }, { section: "asc" }],
  })
  const students = await prisma.student.findMany({
    where: {
      schoolId: school.id,
    },
  })
  const subjects = await prisma.subject.findMany({
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
          <div className='h-full m-4 mt-0 bg-white p-4 rounded-md  dark:bg-brand '>
            <AttendanceCalendar
              classes={classes}
              students={students}
              subjects={subjects}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AttendanceList
