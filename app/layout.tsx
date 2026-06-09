import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import ThemeSwitcher from "@/components/ui/ThemeSwitcher"

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
      className={`h-full antialiased bg-background`}>
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
