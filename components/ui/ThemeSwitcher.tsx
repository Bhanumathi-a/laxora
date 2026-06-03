"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex items-center rounded-full bg-gray-100 p-1'>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full ${
          theme === "system" ? "bg-white shadow" : ""
        }`}>
        <Monitor size={18} />
      </button>

      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full ${
          theme === "light" ? "bg-white shadow" : ""
        }`}>
        <Sun size={18} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full ${
          theme === "dark" ? "bg-white shadow" : ""
        }`}>
        <Moon size={18} />
      </button>
    </div>
  )
}
