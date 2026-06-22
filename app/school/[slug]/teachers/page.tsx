import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import TeacherTable from "@/components/dashboard/TeacherTable"

type Props = {
  params: Promise<{
    slug: string
  }>
}

const TeacherList = async ({ params }: Props) => {
  const { slug } = await params
  const school = await prisma.school.findUnique({
    where: { slug },
  })

  if (!school) {
    return <div>School not found</div>
  }
  const teachers = await prisma.teacher.findMany({
    where: {
      schoolId: school.id,
    },
    include: {
      subjects: true,
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
          <TeacherTable
            initialTeachers={teachers}
            subjects={subjects}
            slug={slug}
          />
        </div>
      </div>
    </>
  )
}

export default TeacherList
