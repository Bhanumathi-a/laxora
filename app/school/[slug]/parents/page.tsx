import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import ParentTable from "@/components/dashboard/ParentTable"

type Props = {
  params: Promise<{
    slug: string
  }>
}

const ParentList = async ({ params }: Props) => {
  const { slug } = await params
  const school = await prisma.school.findUnique({
    where: { slug },
  })

  if (!school) {
    return <div>School not found</div>
  }
  const parents = await prisma.parent.findMany({
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
          <ParentTable slug={slug} initialParents={parents} />
        </div>
      </div>
    </>
  )
}

export default ParentList
