import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ message: "Name required" }, { status: 400 });
        }

        const school = await prisma.school.create({
            data: {
                name,
                slug: name.toLowerCase().replace(/\s+/g, "-"),
            }
        });

        return NextResponse.json({ school });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error creating school" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const schools = await prisma.school.findMany({
            include: {
                students: true,
            },
        });

        return NextResponse.json({ schools });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error fetching schools" },
            { status: 500 }
        );
    }
}