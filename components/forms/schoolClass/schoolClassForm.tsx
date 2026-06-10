import { SchoolClass } from "@/types/schoolClass"
import InputField from "../shared/InputField"

import InputButton from "../shared/InputButton"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  SchoolClassFormData,
  schoolClassSchema,
} from "@/lib/validations/schoolClass"
import toast from "react-hot-toast"

type SchoolClassFormProps = {
  mode: "create" | "edit"
  schoolClassData?: SchoolClass
  setOpen: (open: boolean) => void
  schoolClass: SchoolClass[]
  setschoolClass: React.Dispatch<React.SetStateAction<SchoolClass[]>>
}
const SchoolClassForm = ({
  mode,
  schoolClassData,
  setOpen,
  schoolClass,
  setschoolClass,
}: SchoolClassFormProps) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: SchoolClassFormData) => {
    if (mode === "create") {
      const newSchoolClass: SchoolClass = {
        id: crypto.randomUUID(),
        schoolId: "",
        name: data.name,
        section: data.section,
        capacity: data.capacity,
      }

      const response = await fetch("/api/schoolClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSchoolClass),
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast(result.message)
        return
      }
      toast.success("SchoolClass created successfully")
      setschoolClass((prev) => [...prev, result.schoolClass])

      reset()
      setOpen(false)
    }
    if (mode === "edit" && schoolClassData) {
      const response = await fetch(`/api/schoolClass/${schoolClassData.id}`, {
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
      toast.success("SchoolClass updated successfully")
      setschoolClass((prev) =>
        prev.map((schoolClass) =>
          schoolClass.id === schoolClassData.id
            ? result.schoolClass
            : schoolClass,
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
  } = useForm<SchoolClassFormData>({
    resolver: zodResolver(schoolClassSchema),
    defaultValues:
      mode === "edit" && schoolClassData
        ? {
            name: schoolClassData.name,
            section: schoolClassData.section,
            capacity: schoolClassData.capacity ?? 0,
          }
        : {},
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-12 overflow-auto'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {mode === "create" ? "Register SchoolClass" : "Update SchoolClass"}
          </h2>
          <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <InputField label='Class Name' {...register("name")} />
              {errors.name && (
                <p className='text-red-400'>{errors.name.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Section' {...register("section")} />

              {errors.section && (
                <p className='text-red-400'>{errors.section.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField
                label='Capacity'
                type='number'
                {...register("capacity", {
                  valueAsNumber: true,
                })}
              />
              {errors.capacity && (
                <p className='text-red-400'>{errors.capacity.message}</p>
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
          title={mode === "create" ? "Register Class" : "Update Class"}
          type='submit'
          bgColor='bg-brand'
          textColor='text-white'
          loading={loading}
        />
      </div>
    </form>
  )
}
export default SchoolClassForm
