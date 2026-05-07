import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    try {
        console.log("🌱 Seeding started...")

        // 🔹 1. Create Schools
        const laxora = await prisma.school.upsert({
            where: { name: "Laxora Demo School" },
            update: {},
            create: { name: "Laxora Demo School" },
        })

        const vidyasagar = await prisma.school.upsert({
            where: { name: "Vidyasagar School" },
            update: {},
            create: { name: "Vidyasagar School" },
        })

        console.log("✅ Schools ready")

        // 🔹 2. Hash password
        const hashedPassword = await bcrypt.hash("admin123", 10)

        // 🔹 3. SUPER ADMIN
        const superAdmin = await prisma.user.upsert({
            where: { email: "super_admin@laxora.com" },
            update: {},
            create: {
                name: "Super Admin",
                email: "super_admin@laxora.com",
                password: hashedPassword,
                role: Role.SUPER_ADMIN,
                schoolId: laxora.id,
            },
        })

        // 🔹 4. SCHOOL ADMIN (Laxora)
        const schoolAdmin1 = await prisma.user.upsert({
            where: { email: "admin@laxora.com" },
            update: {},
            create: {
                name: "Laxora Admin",
                email: "admin@laxora.com",
                password: hashedPassword,
                role: Role.ADMIN,
                schoolId: laxora.id,
            },
        })

        // 🔹 5. SCHOOL ADMIN (Vidyasagar)
        const schoolAdmin2 = await prisma.user.upsert({
            where: { email: "admin@vidyasagar.com" },
            update: {},
            create: {
                name: "Vidyasagar Admin",
                email: "admin@vidyasagar.com",
                password: hashedPassword,
                role: Role.ADMIN,
                schoolId: vidyasagar.id,
            },
        })

        console.log("✅ Users created")

        console.log("🎉 Seeding complete")
    } catch (error) {
        console.error("❌ Seeding failed:", error)
    } finally {
        await prisma.$disconnect()
    }
}

main()