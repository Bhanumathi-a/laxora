import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const body = await req.json()

        const updatedTeacher =
            await prisma.teacher.update({
                where: {
                    id,
                },

                data: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    gender: body.gender,
                    teacherId: body.teacherId,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    city: body.city,
                    pin: body.pin,
                    state: body.state,
                    country: body.country,
                    subject: body.subject,
                },
            })

        return NextResponse.json({
            message: "Teacher updated",
            teacher: updatedTeacher,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to update teacher",
            },
            {
                status: 500,
            }
        )
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        await prisma.teacher.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({
            message: "Teacher deleted",
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to delete teacher",
            },
            {
                status: 500,
            }
        )
    }
}