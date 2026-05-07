import { Search, MessageSquare, Bell, User } from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"
import Link from "next/link"
import Image from "next/image"
export default async function SchoolDashboard({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // const logout = async () => {
  //   await fetch("/api/logout", { method: "POST" })
  //   window.location.href = "/login"
  // }
  return (
    <>
      {/* <button
        onClick={logout}
        className='mt-5 w-auto py-4 rounded-lg font-semibold tracking-wide bg-brand text-white hover:bg-blue-main transition duration-300 cursor-pointer inline-block'>
        <span className='ml-3'>Logout</span>
      </button> */}
      {/* Sidebar Top Navbar 4 Stats Cards Students Table Attendance Chart
      Announcements */}
      <div className='h-screen flex'>
        <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
          <Link href='/' className='global-flex-center lg:justify-start  gap-2'>
            {/* ID : {id} */}
            {/* <h2>logo</h2> */}
            {/* <Image src='/logo.png' alt='Laxora' width={32} height={32} />
            <span className='hidden lg:block'>
              <Image src='/logo.svg' alt='Laxora' width={150} height={95} />
            </span> */}
          </Link>

          <Sidebar role='ADMIN' />
        </div>
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl-w-[86%] bg-[#f7f8fa] overflow-y-auto flex flex-col'>
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
          <h1 className='text-2xl font-bold inline-block'>Laxora Dashboard</h1>
        </div>
      </div>
    </>
  )
}
