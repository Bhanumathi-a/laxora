import { Subject } from "./subject"

export type Teacher = {
    id: string
    firstName: string
    lastName: string
    teacherId: string
    email: string
    phone: string
    image: string | null
    schoolId: string
    gender: string
    address: string
    city: string
    pin: string
    state: string
    country: string
    password: string
    dateOfBirth: Date | null
    bloodGroup: string | null
    joiningDate: Date | null

    subjects?: Subject[]
    subjectIds?: string[]
}