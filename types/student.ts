export type Student = {
    id: string
    firstName: string
    lastName: string
    gender: string
    studentId: string
    email: string
    phone: string
    address: string
    city: string
    pin: string
    state: string
    country: string
    classId: string | null
    image: string | null
    schoolId: string
    password: string
    dateOfBirth: Date | null
    bloodGroup: string | null
    previousClass: string | null
    admissionDate: Date | null
    class?: {
        id: string
        name: string
        section: string
        schoolId: string
        capacity: number | null
    } | null

}
