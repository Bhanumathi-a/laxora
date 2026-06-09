import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import { prisma } from "@/lib/prisma"

type Props = {
  params: Promise<{
    slug: string
    studentId: string
  }>
}

const StudentDashboard = async ({ params }: Props) => {
  const { studentId, slug } = await params

  const school = await prisma.school.findUnique({
    where: { slug },
  })

  return (
    <>
      <div className='h-screen flex'>
        <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-2 lg:p-4'>
          <Sidebar role='STUDENT' slug={slug} schoolName={school?.name ?? ""} />
        </div>
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl-w-[86%] bg-[#f7f8fa] flex flex-col'>
          <Header />
          <div>Dashboard</div>
        </div>
      </div>
    </>
  )
}

export default StudentDashboard
