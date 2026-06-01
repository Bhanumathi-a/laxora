import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
type TeacherInput = {
    firstName: string
    lastName: string
    gender: "Male" | "Female" | "Other"
    teacherId: string
    email: string
    phone: string
    address: string
    city: string
    pin: string
    state: string
    country: string
    subject: string
    image?: string
}
export async function POST(req: Request) {
    try {
        const body: TeacherInput = await req.json();
        const {
            firstName,
            lastName,
            gender,
            teacherId,
            email,
            phone,
            address,
            city,
            pin,
            state,
            country,
            subject,
            image,
        } = body
        if (!firstName || !teacherId || !subject) {
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
        const teacher = await prisma.teacher.create({
            data: {
                firstName,
                lastName,
                gender,
                teacherId,
                email,
                phone,
                address,
                city,
                pin,
                state,
                country,
                subject,
                image: image || "",
                schoolId: school.id,
            },
        });
        return NextResponse.json({
            message: "Teacher created",
            teacher,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}