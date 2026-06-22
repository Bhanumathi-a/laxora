import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
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
    subjectIds: string[]
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

    joiningDate: Date

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
            subjectIds,
            image,
            password,
            dateOfBirth,
            bloodGroup,
            joiningDate
        } = body
        if (
            !firstName ||
            !teacherId ||
            !subjectIds ||
            subjectIds.length === 0
        ) {
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
        const hashedPassword = await bcrypt.hash(password, 10)
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
                subjects: {
                    connect: subjectIds.map((id) => ({
                        id,
                    })),
                },
                image: image || "",
                schoolId: school.id,
                password: hashedPassword,

                dateOfBirth: dateOfBirth
                    ? new Date(dateOfBirth)
                    : null,

                joiningDate: joiningDate
                    ? new Date(joiningDate)
                    : new Date(),

                bloodGroup,
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