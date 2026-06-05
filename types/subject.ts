export type Subject = {
    id: string
    name: string
    schoolId: string

    teacherId: string | null

    teacher?: {
        id: string
        teacherId: string
        firstName: string
        lastName: string
    } | null
}