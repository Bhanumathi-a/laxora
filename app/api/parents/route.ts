import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
type ParentInput = {
    name: string
    phone: string
    address: string
    city: string
    pin: string
    state: string
    country: string
    student: string
}
export async function POST(req: Request) {
    try {
        const body: ParentInput = await req.json();
        const {
            name,
            phone,
            address,
            city,
            pin,
            state,
            country,
            student
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
        const parent = await prisma.parent.create({
            data: {
                name,
                phone,
                address,
                city,
                pin,
                state,
                country,
                student,
                schoolId: school.id,
            },
        });
        return NextResponse.json({
            message: "Parent created",
            parent,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}