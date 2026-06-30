import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

type AttendanceInput = {
    date: string
    status: "PRESENT" | "ABSENT"
    studentId: string
}

export async function POST(req: Request) {
    try {
        const body: AttendanceInput = await req.json()

        const { date, status, studentId } = body

        if (!date || !status || !studentId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        const student = await prisma.student.findUnique({
            where: {
                id: studentId,
            },
        })

        if (!student) {
            return NextResponse.json(
                { message: "Student not found" },
                { status: 400 }
            )
        }
        const attendanceDate = new Date(date)
        attendanceDate.setHours(12, 0, 0, 0)
        const attendance = await prisma.attendance.upsert({
            where: {
                studentId_date: {
                    studentId,
                    date: attendanceDate,
                },
            },
            update: {
                status,
            },
            create: {
                studentId,
                date: attendanceDate,
                status,
            },
        })

        return NextResponse.json({
            message: "Attendance created",
            attendance,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const classId = searchParams.get("classId")
        const month = searchParams.get("month")
        const year = searchParams.get("year")

        if (!classId || !month || !year) {
            return NextResponse.json(
                { message: "Missing required parameters" },
                { status: 400 }
            )
        }

        const startDate = new Date(Number(year), Number(month), 1)
        const endDate = new Date(Number(year), Number(month) + 1, 1)

        const attendance = await prisma.attendance.findMany({
            where: {
                student: {
                    classId,
                },
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            include: {
                student: true,
            },
            orderBy: [
                {
                    date: "asc",
                },
            ],
        })

        return NextResponse.json(attendance)
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { message: "Failed to fetch attendance" },
            { status: 500 }
        )
    }
}
