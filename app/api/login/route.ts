import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { loginId, password } = await req.json()

        if (!loginId || !password) {
            return NextResponse.json(
                { message: "Email/ID and password required" },
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
            const isMatch = await bcrypt.compare(password, user.password)

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
                    schoolSlug: user.school.slug,
                },
            })

            response.cookies.set("token", user.id, {
                httpOnly: true,
                path: "/",
            })
            response.cookies.set("userName", user.name)
            response.cookies.set("role", user.role)
            return response
        }

        // ===== STUDENT LOGIN =====
        const student = await prisma.student.findUnique({
            where: {
                studentId: loginId,
            },
            include: {
                school: true,
            },
        })

        if (student) {
            const isMatch = await bcrypt.compare(password, student.password)

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

            response.cookies.set("token", student.id, {
                httpOnly: true,
                path: "/",
            })

            response.cookies.set("studentId", student.studentId, {
                httpOnly: true,
                path: "/",
            })
            response.cookies.set(
                "userName",
                `${student.firstName} ${student.lastName}`
            )

            response.cookies.set("role", "STUDENT")

            return response
        }

        // ===== TEACHER LOGIN =====
        const teacher = await prisma.teacher.findUnique({
            where: {
                teacherId: loginId,
            },
            include: {
                school: true,
            },
        })

        if (teacher) {
            const isMatch = await bcrypt.compare(password, teacher.password)

            if (!isMatch) {
                return NextResponse.json(
                    { message: "Invalid password" },
                    { status: 401 }
                )
            }

            const response = NextResponse.json({
                message: "Login successful",
                user: {
                    id: teacher.id,
                    role: "TEACHER",
                    schoolSlug: teacher.school.slug,
                },
            })

            response.cookies.set("token", teacher.id, {
                httpOnly: true,
                path: "/",
            })

            response.cookies.set("teacherId", teacher.teacherId, {
                httpOnly: true,
                path: "/",
            })
            response.cookies.set(
                "userName",
                `${teacher.firstName} ${teacher.lastName}`
            )

            response.cookies.set("role", "TEACHER")
            return response
        }

        // ===== NOT FOUND =====
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        )

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
}