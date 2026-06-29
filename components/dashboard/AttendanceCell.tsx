import React, { useState } from "react"

const AttendanceCell = () => {
  const [status, setStatus] = useState("-")
  const toggleStatus = () => {
    if (status === "-") setStatus("P")
    else if (status === "P") setStatus("A")
    else setStatus("P")
  }
  return (
    <>
      <button onClick={toggleStatus}>{status}</button>
    </>
  )
}

export default AttendanceCell
