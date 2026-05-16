
import { LayoutDashboard, Building2, Users } from 'lucide-react';


export const superAdminMenu = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, },
    { label: "Schools", href: "/schools" },
    { label: "Subscription", href: "/subscription" },
    { label: "Reports", href: "/reports" },
    { label: "Support / Ticket", href: "/support" },
]

export const schoolAdminMenu = [
    { label: "Dashboard", href: "/school-dashboard", icon: LayoutDashboard, },
    { label: "Students", href: "/students" },
    { label: "Teachers", href: "/teachers" },
    { label: "Attendance", href: "/attendance" },
]