import { z } from "zod"

export const subjectSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    teacherId: z.string().optional()
})

export type SubjectFormData = z.infer<typeof subjectSchema>
