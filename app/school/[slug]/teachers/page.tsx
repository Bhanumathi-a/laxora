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
  })

  return (
    <>
      <div className='h-screen flex'>
        <div className='w-16 md:w-20 lg:w-64 p-4'>
          <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />
        </div>
        <div className='flex-1 overflow-auto bg-[#f7f8fa] '>
          <Header />
          <TeacherTable slug={slug} initialTeachers={teachers} />
        </div>
      </div>
    </>
  )
}

export default TeacherList
