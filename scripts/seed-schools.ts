import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        // Laxora demo school
        await prisma.school.upsert({
            where: { name: "Laxora Demo School" },
            update: {},
            create: {
                name: "Laxora Demo School",
            },
        });

        // Vidyasagar test school
        await prisma.school.upsert({
            where: { name: "Vidyasagar School" },
            update: {},
            create: {
                name: "Vidyasagar School",
            },
        });

        console.log("✅ Schools seeded");
    } catch (error) {
        console.error("❌ Failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
