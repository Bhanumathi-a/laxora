import { Search, MessageSquare, Bell, User } from "lucide-react"

import Sidebar from "@/components/layout/Sidebar"
import UserCard from "@/components/dashboard/UserCard"
import CountChart from "@/components/dashboard/CountChart"
import AttendanceChart from "@/components/dashboard/AttendanceChart"
import FinanceChart from "@/components/dashboard/FinanceChart"
import EventCalendar from "@/components/dashboard/EventCalendar"
import Announcements from "@/components/dashboard/Announcements"

import { Header } from "@/components/layout/Header"

import { prisma } from "@/lib/prisma"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function SchoolDashboard({ params }: Props) {
  const { slug } = await params
  const school = await prisma.school.findUnique({
    where: { slug },
  })

  if (!school) {
    return <div>School not found</div>
  }

  const studentsCount = await prisma.student.count({
    where: {
      schoolId: school.id,
    },
  })

  const teachersCount = await prisma.teacher.count({
    where: {
      schoolId: school.id,
    },
  })

  const parentsCount = await prisma.parent.count({
    where: {
      schoolId: school.id,
    },
  })

  const subjectsCount = await prisma.subject.count({
    where: {
      schoolId: school.id,
    },
  })

  return (
    <>
      <div className='h-screen flex'>
        <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl-w-[86%] bg-[#f7f8fa] dark:bg-[#171E26] flex flex-col'>
          <Header />
          <div className='flex flex-col justify-between items-center gap-4 md:flex-row'>
            <div className='flex p-4 flex-col gap-4 md:flex-row w-full'>
              <div className='w-full lg:w-2/3 flex flex-col gap-8'>
                {/* user card */}
                <div className='flex gap-4 justify-between items-center flex-wrap'>
                  <UserCard type='Students' count={studentsCount} />
                  <UserCard type='Staff' count={teachersCount} />
                  <UserCard type='Parents' count={parentsCount} />
                  <UserCard type='Departments' count={subjectsCount} />
                </div>

                {/* middle chart */}
                <div className='flex flex-col lg:flex-row gap-4'>
                  {/* count chart */}
                  <div className='w-full lg:w-1/3 h-[450px]'>
                    <CountChart />
                  </div>
                  {/* attendance chart */}
                  <div className='w-full lg:w-2/3 h-[450px]'>
                    <AttendanceChart />
                  </div>
                </div>

                {/* bottom chart */}
                <div className='w-full h-[500px]'>
                  <FinanceChart />
                </div>
              </div>
              <div className='w-full lg:w-1/3 flex flex-col gap-8'>
                <EventCalendar />
                <Announcements />
              </div>
            </div>
            {/* main - Total Schools Total Students (all schools) Total Revenue Active Schools
      New Schools this month */}
          </div>
        </div>
      </div>
    </>
  )
}
