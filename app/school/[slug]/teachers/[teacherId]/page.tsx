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
    teacherId: string
  }>
}

const TeacherDetailsPage = async ({ params }: Props) => {
  const { teacherId, slug } = await params

  const school = await prisma.school.findUnique({
    where: { slug },
  })

  const teacher = await prisma.teacher.findUnique({
    where: {
      teacherId,
    },
  })

  if (!teacher || !school) {
    return <div>Teacher not found</div>
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
                    <div className='w-1/3 flex items-center justify-center '>
                      {teacher.image ? (
                        <Image
                          src={teacher.image}
                          alt={teacher.firstName}
                          height={144}
                          className='w-36 h-36 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                          <User className='w-36 h-36 text-gray-500' />
                        </div>
                      )}
                    </div>
                    <div className='w-2/3 flex flex-col justify-between gap-4'>
                      <h2 className='text-xl font-semibold'>
                        {teacher.firstName} {teacher.lastName}
                      </h2>
                      <span>Subject: {teacher.subject}</span>
                      <p className='text-sm '>
                        <strong>Address:</strong> {teacher.address}
                      </p>
                      <div className='flex flex-col  gap-2  font-medium text-sm'>
                        <div className='flex gap-2 items-center w-full'>
                          <Droplet />
                          <span>O+</span>
                        </div>
                        <div className='flex gap-2 items-center w-full '>
                          <CalendarDays />
                          <span>date of birth</span>
                        </div>
                        <div className='flex gap-2 items-center w-full'>
                          <AtSign />
                          <span>{teacher.email}</span>
                        </div>
                        <div className='flex gap-2 items-center w-full'>
                          <Phone />
                          <span>{teacher.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex-1 flex  gap-4 justify-between flex-wrap'>
                    <div className='bg-white p-4 rounded-md w-full flex gap-4 md:w-[46%] xl:w-[45%] 2xl:w-[48%]'>
                      <BookOpenCheck />
                      <div>
                        <h3 className='text-xl font-semibold'>90%</h3>
                        <span className='text-sm text-gray-400'>
                          Attendance
                        </span>
                      </div>
                    </div>
                    <div className='bg-white p-4 rounded-md w-full flex gap-4 md:w-[46%] xl:w-[45%] 2xl:w-[48%]'>
                      <BookOpen />
                      <div>
                        <h3 className='text-xl font-semibold'>
                          {teacher.subject}
                        </h3>
                        <span className='text-sm text-gray-400'>Subject</span>
                      </div>
                    </div>
                    <div className='bg-white p-4 rounded-md w-full flex gap-4 md:w-[46%] xl:w-[45%] 2xl:w-[48%]'>
                      <ChartNoAxesCombined />
                      <div>
                        <h3 className='text-xl font-semibold'>98%</h3>
                        <span className='text-sm text-gray-400'>
                          Result of last test/exam
                        </span>
                      </div>
                    </div>
                    <div className='bg-white p-4 rounded-md w-full flex gap-4 md:w-[46%] xl:w-[45%] 2xl:w-[48%]'>
                      <ChartNoAxesCombined />
                      <div>
                        <h3 className='text-xl font-semibold'>6A</h3>
                        <span className='text-sm text-gray-400'>Class</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=' bg-white p-4 rounded-md mt-4 h-[800px]'>
                  <div className='text-lg font-semibold my-4'>Schedule</div>
                  <ScheduleCalendar />
                </div>
              </div>
              <div className='w-full lg:w-1/3 flex flex-col gap-4'>
                <div className='bg-white rounded-md p-4'>
                  <div className='text-lg font-semibold my-4'>Shortcuts</div>
                  <div className='flex  gap-4 mt-4 flex-wrap text-sm text-gray-400'>
                    <Link className='p-3 rounded-md bg-sky-50' href=''>
                      Teacher&apos;s Student
                    </Link>
                    <Link className='p-3 rounded-md bg-pink-100' href=''>
                      Teacher Lessons
                    </Link>
                    <Link className='p-3 rounded-md bg-yellow-100' href=''>
                      Teacher Results
                    </Link>
                    <Link className='p-3 rounded-md bg-green-100' href=''>
                      Teacher Exams
                    </Link>
                    <Link className='p-3 rounded-md bg-sky-50' href=''>
                      Teacher Assignments
                    </Link>
                  </div>
                </div>

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

export default TeacherDetailsPage
