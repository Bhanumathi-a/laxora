
import {
    LayoutDashboard,
    Building2,
    Users,
    GraduationCap,
} from "lucide-react"

export const schoolAdminMenu = [
    {
        label: "Dashboard",
        href: "/school-dashboard",
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
        icon: Users,
    },
    {
        label: "Attendance",
        href: "/attendance",
        icon: Building2,
    },
]

export const superAdminMenu = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Schools", href: "/schools", icon: Building2 },
    { label: "Subscription", href: "/subscription" },
    { label: "Reports", href: "/reports" },
    { label: "Support / Ticket", href: "/support" },
]

