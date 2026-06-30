"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type AttendanceCellProps = {
  studentId: string
  date: Date
  status?: "PRESENT" | "ABSENT"
}

const AttendanceCell = ({ studentId, date, status }: AttendanceCellProps) => {
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

  return (
    <button onClick={handleClick} className='w-8 h-8 rounded hover:bg-gray-100'>
      {currentStatus === "PRESENT"
        ? "P"
        : currentStatus === "ABSENT"
          ? "A"
          : "-"}
    </button>
  )
}

export default AttendanceCell
