import { z } from "zod"

export const teacherSchema = z.object({
    firstName: z.string().min(3, "First Name must be at least 3 characters"),
    lastName: z.string().min(1, "Last Name must be at least 1 characters"),
    gender: z
        .string()
        .min(1, "Gender is required")
        .refine(
            (val) =>
                ["Male", "Female", "Other"].includes(val),
            {
                message: "Invalid gender",
            }
        ),
    teacherId: z.string().min(1, "Please enter teacher ID"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number required"),
    address: z.string().min(5, "Address required"),
    city: z.string().min(5, "City required"),
    pin: z.string().min(5, "Pin required"),
    state: z.string().min(2, "State required"),
    country: z.string().min(2, "Country required"),
    subjectIds: z.array(z.string()).optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),

    bloodGroup: z.enum([
        "O+",
        "O-",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
    ]),

    joiningDate: z.string().min(1, "Joining date is required"),
    password: z.string().min(6),
})

export type TeacherFormData = z.infer<typeof teacherSchema>
