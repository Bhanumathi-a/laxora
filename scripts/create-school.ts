import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const laxora = await prisma.school.create({
            data: {
                name: "Laxora Demo School",
                slug: "laxora-demo-school",
            }
        });

        const vidyasagar = await prisma.school.create({
            data: {
                name: "Vidya Sagar",
                slug: "vidya-sagar",
            }
        });

        console.log(`school created: ${laxora}, ${vidyasagar}`);
    } catch (error) {
        console.error("❌ Failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()


