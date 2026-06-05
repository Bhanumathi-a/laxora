import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
type SubjectInput = {
    name: string
    teacherId?: string
}
export async function POST(req: Request) {
    try {
        const body: SubjectInput = await req.json();
        const {
            name,
            teacherId,
        } = body
        if (!name) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }
        const school = await prisma.school.findFirst();
        if (!school) {
            return NextResponse.json(
                { message: "No school found" },
                { status: 400 }
            );
        }
        const subject = await prisma.subject.create({
            data: {
                name,
                teacherId: teacherId || null,
                schoolId: school.id,
            },
        });
        return NextResponse.json({
            message: "subject created",
            subject,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}