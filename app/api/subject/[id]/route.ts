import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const body = await req.json()
        console.log(body)
        const updatedSubject =
            await prisma.subject.update({
                where: {
                    id,
                },

                data: {
                    name: body.name,

                    teachers: {
                        set: [],
                        connect: body.teacherId
                            ? [{ id: body.teacherId }]
                            : [],
                    },
                },
                include: {
                    teachers: true,
                },
            })

        return NextResponse.json({
            message: "Subject updated",
            subject: updatedSubject,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to update Subject",
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

        await prisma.subject.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({
            message: "Subject deleted",
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Failed to delete subject",
            },
            {
                status: 500,
            }
        )
    }
}