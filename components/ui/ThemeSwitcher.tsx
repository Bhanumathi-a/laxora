"use client"
import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex items-center rounded-full bg-gray-100 p-1'>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full text-brand ${
          theme === "system" ? "bg-white shadow" : ""
        }`}>
        <Monitor size={18} />
      </button>

      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full text-brand ${
          theme === "light" ? "bg-white shadow" : ""
        }`}>
        <Sun size={18} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full text-brand ${
          theme === "dark" ? "bg-white shadow" : ""
        }`}>
        <Moon size={18} />
      </button>
    </div>
  )
}
