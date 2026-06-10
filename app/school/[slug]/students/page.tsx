import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import StudentTable from "@/components/dashboard/StudentTable"

type Props = {
  params: Promise<{
    slug: string
  }>
}

const StudentList = async ({ params }: Props) => {
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
    include: {
      class: true,
    },
  })
  const SchoolClasses = await prisma.class.findMany({
    where: {
      schoolId: school.id,
    },
  })

  return (
    <>
      <div className='h-screen flex'>
        <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />

        <div className='flex-1 overflow-auto bg-[#f7f8fa]  dark:bg-[#1e293b]'>
          <Header />

          <StudentTable
            slug={slug}
            initialStudents={students}
            schoolClasses={SchoolClasses}
          />
        </div>
      </div>
    </>
  )
}

export default StudentList
