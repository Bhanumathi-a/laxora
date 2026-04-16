import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const laxora = await prisma.school.create({
            data: { name: "Laxora Demo School" },
        });

        const vidyasagar = await prisma.school.create({
            data: { name: "Vidyasagar School" },
        });

        console.log(`school created: ${laxora}, ${vidyasagar}`);
    } catch (error) {
        console.error("❌ Failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()


