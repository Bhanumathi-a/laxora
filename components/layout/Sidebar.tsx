type SidebarProps = {
  role: "SUPER_ADMIN" | "ADMIN"
  slug?: string
  schoolName?: string
}

import { superAdminMenu, schoolAdminMenu } from "@/lib/menu"
import Link from "next/link"

export default function Sidebar({ role, slug, schoolName }: SidebarProps) {
  const menu = role === "SUPER_ADMIN" ? superAdminMenu : schoolAdminMenu

  const title = role === "SUPER_ADMIN" ? "Laxora" : schoolName || "School"

  const titleLogo = title.toUpperCase().slice(0, 1)

  return (
    <aside className='w-64 border-r min-h-screen'>
      <div className=' flex items-center justify-start mb-2'>
        {/* <span>logo</span> */}
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
            className='flex items-center justify-start lg:justify-start gap-4 text-brand  hover:text-blue-light'>
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
