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

        const attendance = await prisma.attendance.create({
            data: {
                date: new Date(date),
                status,
                studentId,
            },
            include: {
                student: true,
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