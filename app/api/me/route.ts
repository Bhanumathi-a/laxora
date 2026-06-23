import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value
    const role = cookieStore.get("role")?.value

    if (!token || !role) {
        return NextResponse.json(null)
    }

    return NextResponse.json({
        id: token,
        role,
        userName: cookieStore.get("userName")?.value,
    })
}