import {
  superAdminMenu,
  schoolAdminMenu,
  teacherMenu,
  studentMenu,
  parentMenu,
} from "@/lib/menu"

type SidebarProps = {
  role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "PARENT"
  slug?: string
  schoolName?: string
}

import Link from "next/link"

export default function Sidebar({ role, slug, schoolName }: SidebarProps) {
  console.log("Sidebar role:", role)
  const menus = {
    SUPER_ADMIN: superAdminMenu,
    ADMIN: schoolAdminMenu,
    TEACHER: teacherMenu,
    STUDENT: studentMenu,
    PARENT: parentMenu,
  }

  const menu = menus[role]

  const title = role === "SUPER_ADMIN" ? "Laxora" : schoolName || "School"

  const titleLogo = title.toUpperCase().slice(0, 1)

  return (
    <aside className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-2 lg:p-4 h-full bg-[#F8FAFC] dark:bg-[#0D2541]'>
      <div className=' flex items-center justify-start mb-2'>
        <strong className='font-bold text-2xl mr-3 lg:hidden'>
          {titleLogo}
        </strong>
        <span className='hidden lg:block font-light my-4'>{title}</span>
      </div>

      <nav className='space-y-2'>
        {menu.map((item) => (
          <Link
            key={item.href}
            href={
              role === "SUPER_ADMIN" ? item.href : `/school/${slug}${item.href}`
            }
            className='flex items-center justify-start lg:justify-start gap-4 text-brand dark:text-blue-light  hover:text-blue-light'>
            <span className='w-8 h-8 flex items-center justify-center rounded-full p-2 cursor-pointer bg-blue-lighter'>
              {item.icon && <item.icon size={18} />}
            </span>
            <span className='hidden lg:inline-block'>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
