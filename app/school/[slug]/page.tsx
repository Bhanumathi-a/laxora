import { Search, MessageSquare, Bell, User } from "lucide-react"

import Sidebar from "@/components/layout/Sidebar"
import UserCard from "@/components/dashboard/UserCard"
import CountChart from "@/components/dashboard/CountChart"
import AttendanceChart from "@/components/dashboard/AttendanceChart"
import FinanceChart from "@/components/dashboard/FinanceChart"
import EventCalendar from "@/components/dashboard/EventCalendar"
import Announcements from "@/components/dashboard/Announcements"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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

  return (
    <>
      {/* Sidebar Top Navbar 4 Stats Cards Students Table Attendance Chart
      Announcements */}
      {/* School slug: {slug} */}
      <div className='h-screen flex'>
        <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
          <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />
        </div>
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl-w-[86%] bg-[#f7f8fa] flex flex-col'>
          <div className='flex justify-between items-center p-4'>
            {/* Searchbar */}
            <div className='hidden md:flex items-center gap-2 text-xs  ring-[1.5px] ring-brand px-2'>
              <input
                type='text'
                name=''
                id=''
                placeholder='Search...'
                className='width-[200px] p-2 bg-transparent outline-none'
              />
              <Search className='text-brand  w-5 h-5' />
            </div>
            {/* icons and user */}
            <div className='flex items-center justify-end gap-3 w-full'>
              <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                <MessageSquare className='text-brand  w-5 h-5' />
                <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-brand rounded-full text-white text-xs'>
                  1
                </div>
              </div>
              <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                <Bell className='text-brand  w-5 h-5' />
                <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-brand rounded-full text-white text-xs'>
                  1
                </div>
              </div>
              <div className='flex flex-row'>
                <User />
                <div className='flex flex-col'>
                  <span className='text-xs leading-3 font-medium'>
                    John Doe
                  </span>
                  <span className='text-[10px] text-right text-gray-500'>
                    admin
                  </span>
                </div>
              </div>
            </div>
            {/* <button
              onClick={logout}
              className='mt-5 w-auto py-4 rounded-lg font-semibold tracking-wide bg-brand text-white hover:bg-blue-main transition duration-300 cursor-pointer inline-block'>
              <span className='ml-3'>Logout</span>
            </button> */}
          </div>
          <div className='flex flex-col justify-between items-center gap-4 md:flex-row'>
            <div className='flex p-4 flex-col gap-4 md:flex-row w-full'>
              <div className='w-full lg:w-2/3 flex flex-col gap-8'>
                {/* user card */}
                <div className='flex gap-4 justify-between items-center flex-wrap'>
                  <UserCard type='Students' />
                  <UserCard type='Staff' />
                  <UserCard type='Parents' />
                  <UserCard type='Detaprtments' />
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
