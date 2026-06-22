"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function Login() {
  const router = useRouter()

  const [loginId, setloginId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ loginId, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    if (data.user.role === "SUPER_ADMIN") {
      router.push("/dashboard")
    } else if (data.user.role === "STUDENT") {
      router.push(`/school/${data.user.schoolSlug}/students/dashboard`)
    } else if (data.user.role === "TEACHER") {
      router.push(`/school/${data.user.schoolSlug}/teacher/dashboard`)
    } else {
      router.push(`/school/${data.user.schoolSlug}`)
    }
  }
  return (
    <div className='min-h-screen bg-background text-gray-900 dark:text-gray-200 flex justify-center'>
      <div className='max-w-screen m-0 sm:m-10 bg-white  dark:bg-[#2d3a50] shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h2 className='text-2xl xl:text-3xl font-extrabold'>Sign in</h2>
            <div className='w-full flex-1 mt-8'>
              <div className='mx-auto max-w-xs'>
                <input
                  value={loginId}
                  onChange={(e) => setloginId(e.target.value)}
                  className='inputClass'
                  type='text'
                  placeholder='Email / Username'
                />

                <div className='relative mt-5'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='inputClass'
                    type={showPassword ? "text" : "password"}
                    placeholder='Password'
                  />

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer'>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button onClick={handleLogin} className='btn'>
                  <span className='ml-3'>Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 bg-[#51A4D5] text-center hidden lg:flex'>
          <div className='w-full h-full object-fill m-auto'>
            <Image
              src='/banner.jpg'
              width={930}
              height={634}
              alt='Laxora'
              className='w-full h-auto object-fill'
              loading='eager'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
