import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    const path = req.nextUrl.pathname

    const isProtected =
        path.startsWith("/dashboard") ||
        path.startsWith("/school-dashboard")

    const isLogin = path.startsWith("/login")

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (isLogin && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/school-dashboard/:path*", "/login"],
}