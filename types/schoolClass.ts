import { Subject } from "./subject"
export type SchoolClass = {
    id: string
    name: string
    section: string
    capacity: number | null
    schoolId: string

    subjects?: Subject[]
    subjectIds?: string
}