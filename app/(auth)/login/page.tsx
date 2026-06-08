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
    } else {
      router.push(`/school/${data.user.schoolSlug}`)
    }
  }
  return (
    <div className='min-h-screen bg-[var(--background)] text-gray-900 dark:text-gray-200 flex justify-center'>
      <div className='max-w-screen m-0 sm:m-10 bg-[#f7f8fa]  dark:bg-[#1e293b] shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h2 className='text-2xl xl:text-3xl font-extrabold'>Sign in</h2>
            <div className='w-full flex-1 mt-8'>
              <div className='mx-auto max-w-xs'>
                <input
                  value={loginId}
                  onChange={(e) => setloginId(e.target.value)}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Email / Username'
                />
                {/* <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                /> */}
                <div className='relative mt-5'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    type={showPassword ? "text" : "password"}
                    placeholder='Password'
                  />

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button
                  onClick={handleLogin}
                  className='mt-5 w-full py-4 rounded-lg font-semibold tracking-wide bg-brand text-white hover:bg-blue-main transition duration-300 cursor-pointer'>
                  <span className='ml-3'>Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 bg-blue-light2 text-center hidden lg:flex'>
          <div className='w-[500px] m-auto'>
            Laxora
            {/* <Image
              src='/laxora_logo.png'
              width={1024}
              height={299}
              alt='Laxora'
              className='w-full h-auto'
              loading='eager'
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
