import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import ThemeSwitcher from "@/components/ui/ThemeSwitcher"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// })

export const metadata: Metadata = {
  title: "Laxora",
  description: "School Management app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      suppressHydrationWarning
      lang='en'
      className={`h-full antialiased bg-[var(--background)]`}>
      <body className='min-h-full flex flex-col'>
        <ThemeProvider>
          {children}
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 3000,
            }}
          />
          <div className='fixed bottom-15 left-4 z-50'>
            <ThemeSwitcher />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
