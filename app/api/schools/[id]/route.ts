import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { name } = await req.json();

    const school = await prisma.school.update({
        where: { id: params.id },
        data: { name },
    });

    return NextResponse.json({ school });
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    await prisma.school.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted" });
}