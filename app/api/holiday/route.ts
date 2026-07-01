import { PrismaClient } from "@prisma/client"

import { NextResponse } from "next/server"

const prisma = new PrismaClient()

type HolidayInput = {
    title: string
    date: string
    type: "SCHOOL" | "PUBLIC"
    schoolId: string
}

export async function POST(req: Request) {

    try {
        const body: HolidayInput = await req.json()
        const { title, date, type, schoolId } = body

        if (!title || !date || !type || !schoolId) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }
        const school = await prisma.school.findUnique({
            where: {
                id: schoolId,
            },
        })

        if (!school) {
            return NextResponse.json(
                { message: "School not found" },
                { status: 400 }
            )
        }
        const holiday = await prisma.holiday.create({
            data: {
                title,
                date: new Date(date),
                type,
                schoolId,
            },
        })
        return NextResponse.json({
            message: "Holiday created",
            holiday,
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

        const schoolId = searchParams.get("schoolId")
        const month = searchParams.get("month")
        const year = searchParams.get("year")

        if (!schoolId || !month || !year) {
            return NextResponse.json(
                { message: "Missing required parameters" },
                { status: 400 }
            )
        }

        const startDate = new Date(Number(year), Number(month), 1)
        const endDate = new Date(Number(year), Number(month) + 1, 1)

        const holidays = await prisma.holiday.findMany({
            where: {
                schoolId,
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            orderBy: {
                date: "asc",
            },
        })

        return NextResponse.json(holidays)
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { message: "Failed to fetch holidays" },
            { status: 500 }
        )
    }
}