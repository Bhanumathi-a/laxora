type SidebarProps = {
  role: "SUPER_ADMIN" | "ADMIN"
}

import { superAdminMenu, schoolAdminMenu } from "@/lib/menu"
import { Icon } from "lucide-react"
import Link from "next/link"

export default function Sidebar({ role }: SidebarProps) {
  const menu = role === "SUPER_ADMIN" ? superAdminMenu : schoolAdminMenu

  const title = role === "SUPER_ADMIN" ? "Laxora" : "Vidya Sagar"

  return (
    <>
      <aside className='w-64 border-r min-h-screen p-4'>
        <span className='hidden lg:block font-light my-4'>{title}</span>

        <nav className='space-y-2'>
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 md:px-3 py-1 hover:bg-primary-lighter '>
              <span className='inline-block '></span>
              <span className='hidden lg:block '>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
