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
    attendanceId: string
  }>
}

const attendanceDetailsPage = async ({ params }: Props) => {
  const { attendanceId, slug } = await params

  const school = await prisma.school.findUnique({
    where: { slug },
  })

  const attendance = await prisma.attendance.findUnique({
    where: {
      id: attendanceId,
    },
    include: {
      student: {
        include: {
          class: true,
        },
      },
    },
  })

  if (!attendance || !school) {
    return <div>Attendance not found</div>
  }

  return (
    <>
      <div className='h-screen flex'>
        <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />

        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl-w-[86%] bg-[#f7f8fa] flex flex-col'>
          <Header />
          <div className='flex flex-col justify-between items-center gap-4 md:flex-row'>
            <div className='flex flex-1 p-4 flex-col gap-4 md:flex-row'>
              <div className='w-full lg:w-2/3 '>
                <div className='flex flex-col lg:flex-row gap-4'>
                  <div className='bg-blue-light2 px-4 py-6 rounded-md flex-1 flex gap-4'>
                    <div className='w-2/3 flex flex-col justify-between gap-4'>
                      <h2 className='text-xl font-semibold'>
                        <strong>Student:</strong>{" "}
                        {attendance?.student?.firstName}{" "}
                        {attendance?.student?.lastName}
                      </h2>
                      <p>
                        <strong>Class:</strong> {attendance.student.class.name}{" "}
                        -{attendance.student.class.section}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {attendance?.date.toLocaleDateString()}
                      </p>

                      <p>
                        <strong>Status:</strong> {attendance?.status}
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

export default attendanceDetailsPage
