import Announcements from "@/components/dashboard/Announcements"
import EventCalendar from "@/components/dashboard/EventCalendar"
import ScheduleCalendar from "@/components/dashboard/ScheduleCalendar"
import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import { prisma } from "@/lib/prisma"
import {
  AtSign,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  ChartNoAxesCombined,
  Droplet,
  Phone,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: Promise<{
    slug: string
    schoolClassId: string
  }>
}

const schoolClassDetailsPage = async ({ params }: Props) => {
  const { schoolClassId, slug } = await params

  const school = await prisma.school.findUnique({
    where: { slug },
  })

  const schoolClass = await prisma.class.findUnique({
    where: {
      id: schoolClassId,
    },
  })

  if (!schoolClass || !school) {
    return <div>SchoolClass not found</div>
  }

  return (
    <>
      <div className='h-screen flex'>
        <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-2 lg:p-4'>
          <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />
        </div>
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl-w-[86%] bg-[#f7f8fa] flex flex-col'>
          <Header />
          <div className='flex flex-col justify-between items-center gap-4 md:flex-row'>
            <div className='flex flex-1 p-4 flex-col gap-4 md:flex-row'>
              <div className='w-full lg:w-2/3 '>
                <div className='flex flex-col lg:flex-row gap-4'>
                  <div className='bg-blue-light2 px-4 py-6 rounded-md flex-1 flex gap-4'>
                    <div className='w-2/3 flex flex-col justify-between gap-4'>
                      <h2 className='text-xl font-semibold'>
                        {schoolClass.name}
                      </h2>
                      <span>Section: {schoolClass.section}</span>
                      <p className='text-sm '>
                        <strong>Capacity:</strong> {schoolClass.capacity}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=' bg-white p-4 rounded-md mt-4 h-[800px]'>
                  <div className='text-lg font-semibold my-4'>
                    Class Schedule
                  </div>
                  <ScheduleCalendar />
                </div>
              </div>
              <div className='w-full lg:w-1/3 flex flex-col gap-4'>
                <EventCalendar />
                <Announcements />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default schoolClassDetailsPage
