import { Student } from "@/types/student"
import InputField from "../shared/InputField"
import ImageUpload from "../shared/ImageUpload"
import InputButton from "../shared/InputButton"
import { useState } from "react"
import SelectField from "../shared/SelectField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentFormData, studentSchema } from "@/lib/validations/student"
import toast from "react-hot-toast"

type StudentFormProps = {
  mode: "create" | "edit"
  studentData?: Student
  setOpen: (open: boolean) => void
  students: Student[]
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
}
const StudentForm = ({
  mode,
  studentData,
  setOpen,
  students,
  setStudents,
}: StudentFormProps) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: StudentFormData) => {
    if (mode === "create") {
      const newStudent: Student = {
        id: crypto.randomUUID(),
        schoolId: "",
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender as "Male" | "Female" | "Other",
        studentId: data.studentId,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        pin: data.pin,
        state: data.state,
        country: data.country,
        grade: data.grade,
        image: "",
      }

      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast(result.message)
        return
      }
      toast.success("Student created successfully")
      setStudents((prev) => [...prev, result.student])

      reset()
      setOpen(false)
    }
    if (mode === "edit" && studentData) {
      const response = await fetch(`/api/students/${studentData.id}`, {
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
      toast.success("Student updated successfully")
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentData.id ? result.student : student,
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
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues:
      mode === "edit" && studentData
        ? {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            gender: studentData.gender as "Male" | "Female" | "Other",
            studentId: studentData.studentId,
            email: studentData.email,
            phone: studentData.phone,
            address: studentData.address,
            city: studentData.city,
            pin: studentData.pin,
            state: studentData.state,
            country: studentData.country,
            grade: studentData.grade,
          }
        : {},
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-12 overflow-auto'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {mode === "create" ? "Register Student" : "Update Student"}
          </h2>
          <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <InputField label='First name' {...register("firstName")} />
              {errors.firstName && (
                <p className='text-red-400'>{errors.firstName.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Last name' {...register("lastName")} />
              {errors.lastName && (
                <p className='text-red-400'>{errors.lastName.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Student ID' {...register("studentId")} />
              {errors.studentId && (
                <p className='text-red-400'>{errors.studentId.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <SelectField
                label='Gender'
                name='gender'
                options={["Male", "Female", "Other"]}
                register={register("gender")}
              />
              {errors.gender && (
                <p className='text-red-400'>{errors.gender.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField
                label='Email Address'
                {...register("email")}
                type='email'
              />
              {errors.email && (
                <p className='text-red-400'>{errors.email.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Mobile Number' {...register("phone")} />
              {errors.phone && (
                <p className='text-red-400'>{errors.phone.message}</p>
              )}
            </div>
            <div className='col-span-full'>
              <ImageUpload />
            </div>
            <div className='col-span-full'>
              <InputField label='Address' {...register("address")} />
              {errors.address && (
                <p className='text-red-400'>{errors.address.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='City' {...register("city")} />
              {errors.city && (
                <p className='text-red-400'>{errors.city.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Zip / Pincode' {...register("pin")} />
              {errors.pin && (
                <p className='text-red-400'>{errors.pin.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='State' {...register("state")} />
              {errors.state && (
                <p className='text-red-400'>{errors.state.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Country' {...register("country")} />
              {errors.country && (
                <p className='text-red-400'>{errors.country.message}</p>
              )}
            </div>
          </div>
          <h2 className='text-base/7 font-semibold text-gray-900 mt-10'>
            Academic Details
          </h2>
          <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <InputField label='Grade' {...register("grade")} />
              {errors.grade && (
                <p className='text-red-400'>{errors.grade.message}</p>
              )}
            </div>
            {/* <div className='sm:col-span-3'>
              <InputField label='Previous Grade' name='prevGrade' />
            </div> */}
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
          title={mode === "create" ? "Register Student" : "Update Student"}
          type='submit'
          bgColor='bg-brand'
          textColor='text-white'
          loading={loading}
        />
      </div>
    </form>
  )
}
export default StudentForm
