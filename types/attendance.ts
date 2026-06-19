import { Student } from "./student"

export type Attendance = {
    id: string
    date: Date
    status: "PRESENT" | "ABSENT"
    studentId: string
    student?: Student
}