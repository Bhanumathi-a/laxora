import { z } from "zod"

export const studentSchema = z.object({
    firstName: z.string().min(3, "First Name must be at least 3 characters"),
    lastName: z.string().min(1, "Last Name must be at least 1 characters"),
    gender: z.string().min(1, "Gender is required").refine((val) => ["Male", "Female", "Other"].includes(val), { message: "Invalid gender", }),
    studentId: z.string().min(1, "Please enter student ID"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number required"),
    address: z.string().min(5, "Address required"),
    city: z.string().min(5, "City required"),
    pin: z.string().min(5, "Pin required"),
    state: z.string().min(2, "State required"),
    country: z.string().min(2, "Country required"),
    classId: z.string().min(1, "Class is required"),
    password: z.string().min(6),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    admissionDate: z.string().min(1, "Admission date is required"),
    bloodGroup: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),
    previousClass: z.string().min(1, "Previous class is required"),

})

export type StudentFormData = z.infer<typeof studentSchema>
