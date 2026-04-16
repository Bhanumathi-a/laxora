import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const school = await prisma.school.findFirst({
            where: { name: "Laxora Demo School" },
        });

        if (!school) {
            throw new Error("School not found");
        }

        const admin = await prisma.user.upsert({
            where: { email: "super_admin@laxora.com" },
            update: {},
            create: {
                name: "Super Admin",
                email: "super_admin@laxora.com",
                password: hashedPassword,
                role: "SUPER_ADMIN",
                schoolId: school.id,
            },
        });

        console.log("✅ Admin created:", admin);

    } catch (error) {
        console.error("❌ Failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();