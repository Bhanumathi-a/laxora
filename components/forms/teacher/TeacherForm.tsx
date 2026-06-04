import { Teacher } from "@/types/teacher"
import InputField from "../shared/InputField"
import ImageUpload from "../shared/ImageUpload"
import InputButton from "../shared/InputButton"
import { useState } from "react"
import SelectField from "../shared/SelectField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TeacherFormData, teacherSchema } from "@/lib/validations/teacher"
import toast from "react-hot-toast"

type TeacherFormProps = {
  mode: "create" | "edit"
  teacherData?: Teacher
  setOpen: (open: boolean) => void
  teachers: Teacher[]
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>
}
const TeacherForm = ({
  mode,
  teacherData,
  setOpen,
  teachers,
  setTeachers,
}: TeacherFormProps) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: TeacherFormData) => {
    if (mode === "create") {
      const newTeacher: Teacher = {
        id: crypto.randomUUID(),
        schoolId: "",
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender as "Male" | "Female" | "Other",
        teacherId: data.teacherId,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        pin: data.pin,
        state: data.state,
        country: data.country,
        subject: data.subject,
        image: "",
      }

      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast(result.message)
        return
      }
      toast.success("Teacher created successfully")
      setTeachers((prev) => [...prev, result.teacher])

      reset()
      setOpen(false)
    }
    if (mode === "edit" && teacherData) {
      const response = await fetch(`/api/teachers/${teacherData.id}`, {
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
      toast.success("Teacher updated successfully")
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === teacherData.id ? result.teacher : teacher,
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
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues:
      mode === "edit" && teacherData
        ? {
            firstName: teacherData.firstName,
            lastName: teacherData.lastName,
            gender: teacherData.gender as "Male" | "Female" | "Other",
            teacherId: teacherData.teacherId,
            email: teacherData.email,
            phone: teacherData.phone,
            address: teacherData.address,
            city: teacherData.city,
            pin: teacherData.pin,
            state: teacherData.state,
            country: teacherData.country,
            subject: teacherData.subject,
          }
        : {},
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-12 overflow-auto'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {mode === "create" ? "Register Teacher" : "Update Teacher"}
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
              <InputField label='Teacher ID' {...register("teacherId")} />
              {errors.teacherId && (
                <p className='text-red-400'>{errors.teacherId.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <SelectField
                label='Gender'
                name='gender'
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
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
              <InputField label='Subject' {...register("subject")} />
              {errors.subject && (
                <p className='text-red-400'>{errors.subject.message}</p>
              )}
            </div>
            {/* <div className='sm:col-span-3'>
              <InputField label='Previous Subject' name='prevSubject' />
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
          title={mode === "create" ? "Register Teacher" : "Update Teacher"}
          type='submit'
          bgColor='bg-brand'
          textColor='text-white'
          loading={loading}
        />
      </div>
    </form>
  )
}
export default TeacherForm
