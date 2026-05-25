import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const { name } = await req.json()

        const school = await prisma.school.update({
            where: { id },
            data: { name },
        })

        return NextResponse.json({ school })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { message: "Failed to update school" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        await prisma.school.delete({
            where: { id },
        })

        return NextResponse.json({
            message: "Deleted",
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { message: "Failed to delete school" },
            { status: 500 }
        )
    }
}