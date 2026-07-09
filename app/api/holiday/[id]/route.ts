import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type HolidayInput = {
    title: string
    date: string
    type: "SCHOOL" | "PUBLIC"
    schoolId: string
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params
        const body: HolidayInput = await req.json()
        const { title, date, type } = body
        const updatedHoliday = await prisma.holiday.update({
            where: {
                id,
            },
            data: {
                title,
                type,
                date: new Date(date),
            },
        })
        return NextResponse.json({
            message: "Holiday updated",
            holiday: updatedHoliday,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: "Failed to update holiday",
            },
            {
                status: 500,
            },
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params
        await prisma.holiday.delete({
            where: {
                id,
            },
        })
        return NextResponse.json({
            message: "Holiday deleted",
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: "Failed to delete holiday",
            },
            {
                status: 500,
            },
        )
    }
}