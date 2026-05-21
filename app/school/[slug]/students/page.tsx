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

  return (
    <>
      <div className='h-screen flex'>
        <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
          <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />
        </div>
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] flex flex-col'>
          <Header />
          <StudentTable />
        </div>
      </div>
    </>
  )
}

export default StudentList
