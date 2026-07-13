
import {
    LayoutDashboard,
    Building2,
    Users,
    GraduationCap,
    Landmark, FlaskConical, UsersRound
} from "lucide-react"



export const superAdminMenu = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Schools", href: "/schools", icon: Building2 },
    { label: "Subscription", href: "/subscription" },
    { label: "Reports", href: "/reports" },
    { label: "Support / Ticket", href: "/support" },
]
export const schoolAdminMenu = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Students",
        href: "/students",
        icon: GraduationCap,
    },
    {
        label: "Teachers",
        href: "/teachers",
        icon: Users,
    },
    {
        label: "Parents",
        href: "/parents",
        icon: UsersRound
    },
    {
        label: "Classes",
        href: "/schoolClass",
        icon: Landmark
    },
    {
        label: "Subjects",
        href: "/subject",
        icon: FlaskConical
    },
    {
        label: "Attendance",
        href: "/attendance",
        icon: Building2,
    },
]
export const studentMenu = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    // {
    //     label: "Subjects",
    //     href: "/subject",
    //     icon: FlaskConical
    // },
    // {
    //     label: "Attendance",
    //     href: "/attendance",
    //     icon: Building2,
    // },
]

export const teacherMenu = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },

]
export const parentMenu = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },

]
