import { z } from "zod"

export const schoolClassSchema = z.object({
    name: z.string().min(1, "Name must be at least 1 characters"),
    section: z.string().min(1, "Section name required"),
    capacity: z.number().min(1, "capacity is required"),
    subjectIds: z.string().optional()
})



export type SchoolClassFormData = z.infer<typeof schoolClassSchema>
