import { z } from "zod"

export const parentSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    student: z.string().min(2, "Student name required"),
    phone: z.string().min(10, "Phone number required"),
    address: z.string().min(5, "Address required"),
    city: z.string().min(2, "City required"),
    pin: z.string().min(5, "Pin required"),
    state: z.string().min(2, "State required"),
    country: z.string().min(2, "Country required"),
})

export type ParentFormData = z.infer<typeof parentSchema>
