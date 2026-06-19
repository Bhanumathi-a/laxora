import { Attendance } from "@/types/attendance"
import InputField from "../shared/InputField"

import InputButton from "../shared/InputButton"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AttendanceFormData,
  attendanceSchema,
} from "@/lib/validations/attendance"
import toast from "react-hot-toast"
import SelectField from "../shared/SelectField"
import { Student } from "@/types/student"

type AttendanceFormProps = {
  mode: "create" | "edit"
  attendanceData?: Attendance
  setOpen: (open: boolean) => void
  attendance: Attendance[]
  setattendance: React.Dispatch<React.SetStateAction<Attendance[]>>
  students: Student[]
}
const AttendanceForm = ({
  mode,
  attendanceData,
  setOpen,
  attendance,
  setattendance,
  students,
}: AttendanceFormProps) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: AttendanceFormData) => {
    if (mode === "create") {
      const newAttendance = {
        date: data.date,
        status: data.status,
        studentId: data.studentId,
      }

      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAttendance),
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast(result.message)
        return
      }
      toast.success("Attendance created successfully")
      setattendance((prev) => [...prev, result.attendance])

      reset()
      setOpen(false)
    }
    if (mode === "edit" && attendanceData) {
      const response = await fetch(`/api/attendance/${attendanceData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast(result.message)
        return
      }
      toast.success("Attendance updated successfully")
      setattendance((prev) =>
        prev.map((attendance) =>
          attendance.id === attendanceData.id ? result.attendance : attendance,
        ),
      )

      reset()
      setOpen(false)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues:
      mode === "edit" && attendanceData
        ? {
            date: attendanceData.date
              ? new Date(attendanceData.date).toISOString().split("T")[0]
              : "",
            status: attendanceData.status,
            studentId: attendanceData.studentId,
          }
        : {},
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-12 overflow-auto'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {mode === "create" ? "Register Attendance" : "Update Attendance"}
          </h2>
          <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <InputField
                label='Attendance'
                {...register("date")}
                type='date'
              />
              {errors.date && (
                <p className='text-red-400'>{errors.date.message}</p>
              )}
            </div>

            <div className='sm:col-span-3'>
              <SelectField
                label='Student'
                name='studentId'
                options={students.map((student) => ({
                  label: `${student.firstName} ${student.lastName}`,
                  value: student.id,
                }))}
                register={register("studentId")}
              />
            </div>
            <div className='sm:col-span-3'>
              <SelectField
                label='Status'
                name='status'
                options={[
                  { label: "Present", value: "PRESENT" },
                  { label: "Absent", value: "ABSENT" },
                ]}
                register={register("status")}
              />
              {errors.status && (
                <p className='text-red-400'>{errors.status.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <InputButton
          title={mode === "create" ? "Reset" : "Cancel"}
          type='button'
          bgColor='bg-gray-300'
          textColor='text-black'
          onClick={() => {
            if (mode === "create") {
              reset()
            } else {
              setOpen(false)
            }
          }}
        />
        <InputButton
          title={
            mode === "create" ? "Register Attendance" : "Update Attendance"
          }
          type='submit'
          bgColor='bg-brand'
          textColor='text-white'
          loading={loading}
        />
      </div>
    </form>
  )
}
export default AttendanceForm
