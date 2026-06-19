import { z } from "zod"

export const attendanceSchema = z.object({
    studentId: z.string().min(1, "Student is required"),
    date: z.string().min(1, "Date is required"),
    status: z.enum(["PRESENT", "ABSENT"]),
})

export type AttendanceFormData = z.infer<typeof attendanceSchema>