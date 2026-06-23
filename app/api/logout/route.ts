import { NextResponse } from "next/server"

export async function POST() {
    const res = NextResponse.json({ message: "Logged out" })

    res.cookies.set("token", "", {
        expires: new Date(0),
    })
    res.cookies.delete("token")
    res.cookies.delete("userName")
    res.cookies.delete("role")

    return res
}