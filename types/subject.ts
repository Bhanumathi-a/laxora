import { Teacher } from "./teacher"

export type Subject = {
    id: string
    name: string
    schoolId: string

    teachers?: Teacher[]
}