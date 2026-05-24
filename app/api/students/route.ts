import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
type StudentInput = {
    firstName: string
    lastName: string
    gender: "Male" | "Female" | "Other"
    studentId: string
    email: string
    phone: string
    address: string
    city: string
    pin: string
    state: string
    country: string
    grade: string
    image?: string
}
export async function POST(req: Request) {
    try {
        const body: StudentInput = await req.json();
        const {
            firstName,
            lastName,
            gender,
            studentId,
            email,
            phone,
            address,
            city,
            pin,
            state,
            country,
            grade,
            image,
        } = body
        if (!firstName || !studentId || !grade) {
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
                firstName,
                lastName,
                gender,
                studentId,
                email,
                phone,
                address,
                city,
                pin,
                state,
                country,
                grade,
                image: image || "",
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