import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type StudentInput = {
    name: string;
    email?: string;
    phone?: string;
    className: string;
    schoolId?: string;
};

export async function POST(req: Request) {
    try {
        const body: StudentInput = await req.json();

        const { name, email, phone, className } = body;

        if (!name || !className) {
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

        const student = await prisma.student.create({
            data: {
                name,
                email,
                phone,
                className,
                schoolId: school.id,
            },
        });

        return NextResponse.json({
            message: "Student created",
            student,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}