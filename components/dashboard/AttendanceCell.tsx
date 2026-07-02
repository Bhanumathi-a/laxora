"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Holiday } from "@/types/holiday"

type AttendanceCellProps = {
  studentId: string
  date: Date
  status?: "PRESENT" | "ABSENT"
  holiday?: Holiday
  role: "ADMIN" | "TEACHER" | "STUDENT" | "PARENT"
}

const AttendanceCell = ({
  role,
  studentId,
  date,
  status,
  holiday,
}: AttendanceCellProps) => {
  const [currentStatus, setCurrentStatus] = useState(status)

  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  const handleClick = async () => {
    const newStatus = currentStatus === "PRESENT" ? "ABSENT" : "PRESENT"

    const response = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        date: date.toISOString(),
        status: newStatus,
      }),
    })

    if (response.ok) {
      setCurrentStatus(newStatus)
    } else {
      toast.error("Failed to save attendance")
    }
  }
  const canEdit = role === "ADMIN" || role === "TEACHER"
  if (holiday) {
    return <span className='text-red-600 font-semibold'>H</span>
  }
  const teacherStates = [undefined, "PRESENT", "ABSENT"] as const

  const adminStates = [undefined, "PRESENT", "ABSENT", "HOLIDAY"] as const
  const states = role === "ADMIN" ? adminStates : teacherStates
  const currentIndex = states.indexOf(currentStatus)
  const nextIndex = (currentIndex + 1) % states.length
  const newStatus = states[nextIndex]
  // console.log(holiday)

  return (
    <button
      disabled={!canEdit}
      onClick={canEdit ? handleClick : undefined}
      className={`w-8 h-8 rounded
      ${canEdit ? "cursor-pointer hover:bg-gray-100" : "cursor-default"}`}>
      {currentStatus === "PRESENT"
        ? "P"
        : currentStatus === "ABSENT"
          ? "A"
          : "-"}
    </button>
  )
}

export default AttendanceCell
