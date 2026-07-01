import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()





async function main() {
    try {
        console.log("🌱 Seeding started...")

        // const teacherPassword = await bcrypt.hash("teacher123", 10)

        // const teachers = [
        //     {
        //         teacherId: "T1001",
        //         firstName: "Anitha",
        //         lastName: "Teacher",
        //         email: "teacher@laxora.com",
        //         phone: "9000000001",
        //         gender: "Female",
        //         subjects: ["English"],
        //     },
        //     {
        //         teacherId: "T1002",
        //         firstName: "Ravi",
        //         lastName: "Kumar",
        //         email: "ravi@laxora.com",
        //         phone: "9000000002",
        //         gender: "Male",
        //         subjects: ["Mathematics"],
        //     },
        //     {
        //         teacherId: "T1003",
        //         firstName: "Meena",
        //         lastName: "Rao",
        //         email: "meena@laxora.com",
        //         phone: "9000000003",
        //         gender: "Female",
        //         subjects: ["Science"],
        //     },
        //     {
        //         teacherId: "T1004",
        //         firstName: "Prakash",
        //         lastName: "Gowda",
        //         email: "prakash@laxora.com",
        //         phone: "9000000004",
        //         gender: "Male",
        //         subjects: ["Kannada", "EVS"],
        //     },
        // ]
        // const createdTeachers: Record<string, string> = {}

        // for (const teacher of teachers) {
        //     const createdTeacher = await prisma.teacher.upsert({
        //         where: {
        //             teacherId: teacher.teacherId,
        //         },
        //         update: {},
        //         create: {
        //             teacherId: teacher.teacherId,
        //             firstName: teacher.firstName,
        //             lastName: teacher.lastName,
        //             email: teacher.email,
        //             phone: teacher.phone,
        //             password: teacherPassword,
        //             gender: teacher.gender,
        //             address: "Bangalore",
        //             city: "Bangalore",
        //             pin: "560001",
        //             state: "Karnataka",
        //             country: "India",
        //             schoolId: laxora.id,
        //         },
        //     })

        //     createdTeachers[teacher.teacherId] = createdTeacher.id
        // }

        // console.log("✅ Teachers created")
        // const subjectTeacherMap = [
        //     { subject: "English", teacher: "T1001" },
        //     { subject: "Mathematics", teacher: "T1002" },
        //     { subject: "Science", teacher: "T1003" },
        //     { subject: "Kannada", teacher: "T1004" },
        //     { subject: "EVS", teacher: "T1004" },
        // ]

        // for (const item of subjectTeacherMap) {
        //     await prisma.subject.update({
        //         where: {
        //             schoolId_name: {
        //                 schoolId: laxora.id,
        //                 name: item.subject,
        //             },
        //         },
        //         data: {
        //             teachers: {
        //                 connect: {
        //                     id: createdTeachers[item.teacher],
        //                 },
        //             },
        //         },
        //     })
        // }

        // console.log("✅ Subjects connected to teachers")
        // const students = [
        //     {
        //         studentId: "ST101",
        //         firstName: "Bhanumathi",
        //         lastName: "A",
        //         classId: class1.id,
        //         parentId: parent1.id,
        //     },
        //     {
        //         studentId: "ST102",
        //         firstName: "Savny",
        //         lastName: "G",
        //         classId: class1.id,
        //         parentId: parent2.id,
        //     },
        // ]
        // for (const student of students) {
        //     await prisma.student.upsert({
        //         where: {
        //             studentId: student.studentId,
        //         },
        //         update: {},
        //         create: {
        //             ...student,
        //             gender: "Female",
        //             email: `${student.studentId.toLowerCase()}@laxora.com`,
        //             phone: "9000000000",
        //             password: hashedPassword,
        //             address: "Bangalore",
        //             city: "Bangalore",
        //             pin: "560001",
        //             state: "Karnataka",
        //             country: "India",
        //             schoolId: laxora.id,
        //         },
        //     })
        // }

        // 🔹 1. Create Schools
        const laxora = await prisma.school.upsert({
            where: { name: "Laxora Demo School" },
            update: {},
            create: {
                name: "Laxora Demo School",
                slug: "laxora-demo-school",
            }
        })

        const vidyasagar = await prisma.school.upsert({
            where: { name: "Vidya Sagar" },
            update: {},
            create: {
                name: "Vidya Sagar",
                slug: "vidya-sagar",
            },
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
        const class1 = await prisma.class.upsert({
            where: {
                schoolId_name_section: {
                    schoolId: laxora.id,
                    name: "LKG",
                    section: "A",
                },
            },
            update: {},
            create: {
                name: "LKG",
                section: "A",
                schoolId: laxora.id,
            },
        })
        console.log("✅ class1 created")
        const class2 = await prisma.class.upsert({
            where: {
                schoolId_name_section: {
                    schoolId: laxora.id,
                    name: "UKG",
                    section: "A",
                },
            },
            update: {},
            create: {
                name: "UKG",
                section: "A",
                schoolId: laxora.id,
            },
        })
        console.log("✅ class2 created")
        const english = await prisma.subject.upsert({
            where: {
                id: "english-subject",
            },
            update: {},
            create: {
                id: "english-subject",
                name: "English",
                schoolId: laxora.id,
            },
        })
        console.log("✅ english created")
        const maths = await prisma.subject.upsert({
            where: {
                id: "maths-subject",
            },
            update: {},
            create: {
                id: "maths-subject",
                name: "Mathematics",
                schoolId: laxora.id,
            },
        })
        console.log("✅ maths created")
        const teacherPassword = await bcrypt.hash("teacher123", 10)

        const teacher = await prisma.teacher.upsert({
            where: {
                teacherId: "T1001",
            },
            update: {},
            create: {
                teacherId: "T1001",
                firstName: "Anitha",
                lastName: "Teacher",
                email: "teacher@laxora.com",
                phone: "9999999999",
                password: teacherPassword,
                gender: "Female",
                address: "Bangalore",
                city: "Bangalore",
                pin: "560001",
                state: "Karnataka",
                country: "India",
                schoolId: laxora.id,
            },
        })
        const teacher2 = await prisma.teacher.upsert({
            where: {
                teacherId: "T1002",
            },
            update: {},
            create: {
                teacherId: "T1002",
                firstName: "Ravi",
                lastName: "Kumar",
                email: "ravi@laxora.com",
                phone: "9000000002",
                password: teacherPassword,
                gender: "Male",
                address: "Bangalore",
                city: "Bangalore",
                pin: "560001",
                state: "Karnataka",
                country: "India",
                schoolId: laxora.id,
            },
        })


        console.log("✅ student created")
        await prisma.subject.upsert({
            where: {
                schoolId_name: {
                    schoolId: laxora.id,
                    name: "English",
                },
            },
            update: {
                teachers: {
                    connect: [{ id: teacher.id }],
                },
            },
            create: {
                name: "English",
                schoolId: laxora.id,
                teachers: {
                    connect: [{ id: teacher.id }],
                },
            },
        })
        console.log("✅ teacher created")
        console.log("🎉 Seeding complete")
    } catch (error) {
        console.error("❌ Seeding failed:", error)
    } finally {
        await prisma.$disconnect()
    }
}

main()