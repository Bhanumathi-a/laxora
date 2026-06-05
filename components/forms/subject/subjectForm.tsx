import { Subject } from "@/types/subject"
import InputField from "../shared/InputField"

import InputButton from "../shared/InputButton"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubjectFormData, subjectSchema } from "@/lib/validations/subject"
import toast from "react-hot-toast"
import SelectField from "../shared/SelectField"
import { Teacher } from "@/types/teacher"

type SubjectFormProps = {
  mode: "create" | "edit"
  subjectData?: Subject
  setOpen: (open: boolean) => void
  subject: Subject[]
  setsubject: React.Dispatch<React.SetStateAction<Subject[]>>
  teachers: Teacher[]
}
const SubjectForm = ({
  mode,
  subjectData,
  setOpen,
  subject,
  setsubject,
  teachers,
}: SubjectFormProps) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: SubjectFormData) => {
    if (mode === "create") {
      const newSubject: Subject = {
        id: crypto.randomUUID(),
        schoolId: "",
        name: data.name,
        teacherId: data.teacherId ?? null,
      }

      const response = await fetch("/api/subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubject),
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast(result.message)
        return
      }
      toast.success("Subject created successfully")
      setsubject((prev) => [...prev, result.subject])

      reset()
      setOpen(false)
    }
    if (mode === "edit" && subjectData) {
      const response = await fetch(`/api/subject/${subjectData.id}`, {
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
      toast.success("Subject updated successfully")
      setsubject((prev) =>
        prev.map((subject) =>
          subject.id === subjectData.id ? result.subject : subject,
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
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues:
      mode === "edit" && subjectData
        ? {
            name: subjectData.name,
            teacherId: subjectData.teacherId ?? undefined,
          }
        : {},
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-12 overflow-auto'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {mode === "create" ? "Register Subject" : "Update Subject"}
          </h2>
          <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <InputField label='Subject' {...register("name")} />
              {errors.name && (
                <p className='text-red-400'>{errors.name.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <SelectField
                label='Teacher'
                name='teacherId'
                options={teachers.map((teacher) => ({
                  label: `${teacher.firstName} ${teacher.lastName}`,
                  value: teacher.id,
                }))}
                register={register("teacherId")}
              />
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
          title={mode === "create" ? "Register Subject" : "Update Subject"}
          type='submit'
          bgColor='bg-brand'
          textColor='text-white'
          loading={loading}
        />
      </div>
    </form>
  )
}
export default SubjectForm
