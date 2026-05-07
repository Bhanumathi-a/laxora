import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );
        }

        // 1. Check user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        // 3. Success

        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                schoolId: user.schoolId,
            },
        });

        // set cookie
        response.cookies.set("token", user.id, {
            httpOnly: true,
            path: "/",
        })
        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}