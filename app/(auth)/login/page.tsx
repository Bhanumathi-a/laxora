"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      return
    }

    if (data.user.role === "SUPER_ADMIN") {
      router.push("/dashboard")
    } else {
      router.push(`/school/${data.user.schoolSlug}`)
    }
  }
  return (
    <div className='min-h-screen bg-[var(--background)] text-gray-900 flex justify-center'>
      <div className='max-w-screen m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h2 className='text-2xl xl:text-3xl font-extrabold'>Sign in</h2>
            <div className='w-full flex-1 mt-8'>
              <div className='mx-auto max-w-xs'>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='Email'
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                />

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
            <Image
              src='/laxora_logo.png'
              width={1024}
              height={299}
              alt='Laxora'
              className='w-full h-auto'
              loading='eager'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
