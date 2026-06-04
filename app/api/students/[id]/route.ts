import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const body = await req.json()

        const updatedStudent =
            await prisma.student.update({
                where: {
                    id,
                },

                data: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    gender: body.gender,
                    studentId: body.studentId,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    city: body.city,
                    pin: body.pin,
                    state: body.state,
                    country: body.country,
                    class: body.class,
                },
            })

        return NextResponse.json({
            message: "Student updated",
            student: updatedStudent,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to update student",
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

        await prisma.student.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({
            message: "Student deleted",
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to delete student",
            },
            {
                status: 500,
            }
        )
    }
}