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
        <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />

        <div className='flex-1 overflow-auto bg-[#f7f8fa]  dark:bg-[#1e293b]'>
          <Header />
          <ParentTable slug={slug} initialParents={parents} />
        </div>
      </div>
    </>
  )
}

export default ParentList
