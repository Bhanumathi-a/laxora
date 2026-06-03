import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const body = await req.json()

        const updatedParent =
            await prisma.parent.update({
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
            message: "Parent updated",
            parent: updatedParent,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to update parent",
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

        await prisma.parent.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({
            message: "Parent deleted",
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to delete parent",
            },
            {
                status: 500,
            }
        )
    }
}