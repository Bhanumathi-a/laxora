import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

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
    classId: string
    image?: string
    password: string
    dateOfBirth: Date
    bloodGroup:
    | "O+"
    | "O-"
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    previousClass: string
    admissionDate: Date
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
            classId,
            image,
            password,
            dateOfBirth,
            bloodGroup,
            previousClass,
            admissionDate
        } = body
        if (!firstName || !studentId || !classId) {
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
        console.log("classId received:", classId)
        const hashedPassword = await bcrypt.hash(password, 10)
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
                classId,
                image: image || "",
                schoolId: school.id,
                password: hashedPassword,
                dateOfBirth: dateOfBirth
                    ? new Date(dateOfBirth)
                    : null,

                admissionDate: new Date(admissionDate),

                bloodGroup,
                previousClass,
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