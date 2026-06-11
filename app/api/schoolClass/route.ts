import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
type SchoolClassInput = {
    name: string
    section: string
    capacity: number
    subjectIds?: string

}
export async function POST(req: Request) {
    try {
        const body: SchoolClassInput = await req.json();
        const {
            name,
            section,
            capacity,
            subjectIds
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
        const schoolClass = await prisma.class.create({
            data: {
                name,
                section,
                capacity,
                schoolId: school.id,
                subjects: {
                    connect: subjectIds
                        ? [{ id: subjectIds }]
                        : [],
                },
            },
        });
        return NextResponse.json({
            message: "Class created",
            schoolClass,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}