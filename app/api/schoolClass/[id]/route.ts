import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const body = await req.json()

        const updatedSchoolClass =
            await prisma.class.update({
                where: {
                    id,
                },

                data: {
                    name: body.name,
                    phone: body.phone,
                    address: body.address,
                    city: body.city,
                    pin: body.pin,
                    state: body.state,
                    country: body.country,
                    students: body.students,
                },
            })

        return NextResponse.json({
            message: "Class updated",
            schoolClass: updatedSchoolClass,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to update Class",
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

        await prisma.class.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({
            message: "SchoolClass deleted",
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to delete schoolClass",
            },
            {
                status: 500,
            }
        )
    }
}