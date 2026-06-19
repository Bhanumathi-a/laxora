import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const body = await req.json()

        const { date, status, studentId } = body

        if (!date || !status || !studentId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        const updatedAttendance = await prisma.attendance.update({
            where: {
                id,
            },
            data: {
                date: new Date(date),
                status,
                studentId,
            },
        })

        return NextResponse.json({
            message: "Attendance updated",
            attendance: updatedAttendance,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to update attendance",
            },
            {
                status: 500,
            }
        )
    }
}