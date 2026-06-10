import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { loginId, password } = await req.json()

        if (!loginId || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            )
        }

        // ===== USER / ADMIN LOGIN =====
        const user = await prisma.user.findUnique({
            where: {
                email: loginId,
            },
            include: {
                school: true,
            },
        })

        if (user) {
            const isMatch = await bcrypt.compare(
                password,
                user.password
            )

            if (!isMatch) {
                return NextResponse.json(
                    { message: "Invalid password" },
                    { status: 401 }
                )
            }

            const response = NextResponse.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    role: user.role,
                    schoolSlug: user.school?.slug,
                },
            })

            response.cookies.set("token", String(user.id), {
                httpOnly: true,
                path: "/",
            })

            return response
        }

        // ===== STUDENT LOGIN =====
        const student = await prisma.student.findUnique({
            where: {
                studentId: loginId,
            },
            include: {
                school: true,
                class: true,
            },
        })

        if (!student) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        const isMatch = await bcrypt.compare(
            password,
            student.password
        )

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            )
        }

        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: student.id,
                role: "STUDENT",
                schoolSlug: student.school.slug,
            },
        })

        response.cookies.set("token", String(student.id), {
            httpOnly: true,
            path: "/",
        })
        response.cookies.set("studentId", student.studentId, {
            httpOnly: true,
            path: "/",
        })


        return response
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
}