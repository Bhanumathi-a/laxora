import { Parent } from "@/types/parent"
import InputField from "../shared/InputField"
import ImageUpload from "../shared/ImageUpload"
import InputButton from "../shared/InputButton"
import { useState } from "react"
import SelectField from "../shared/SelectField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ParentFormData, parentSchema } from "@/lib/validations/parent"
import toast from "react-hot-toast"

type ParentFormProps = {
  mode: "create" | "edit"
  parentData?: Parent
  setOpen: (open: boolean) => void
  parents: Parent[]
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>
}
const ParentForm = ({
  mode,
  parentData,
  setOpen,
  parents,
  setParents,
}: ParentFormProps) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ParentFormData) => {
    if (mode === "create") {
      const newParent: Parent = {
        id: crypto.randomUUID(),
        schoolId: "",
        name: data.name,
        student: data.student,
        phone: data.phone,
        address: data.address,
        city: data.city,
        pin: data.pin,
        state: data.state,
        country: data.country,
      }

      const response = await fetch("/api/parents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParent),
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast(result.message)
        return
      }
      toast.success("Parent created successfully")
      setParents((prev) => [...prev, result.parent])

      reset()
      setOpen(false)
    }
    if (mode === "edit" && parentData) {
      const response = await fetch(`/api/parents/${parentData.id}`, {
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
      toast.success("Parent updated successfully")
      setParents((prev) =>
        prev.map((parent) =>
          parent.id === parentData.id ? result.parent : parent,
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
  } = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),
    defaultValues:
      mode === "edit" && parentData
        ? {
            name: parentData.name,
            student: parentData.student,
            phone: parentData.phone,
            address: parentData.address,
            city: parentData.city,
            pin: parentData.pin,
            state: parentData.state,
            country: parentData.country,
          }
        : {},
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-12 overflow-auto'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {mode === "create" ? "Register Parent" : "Update Parent"}
          </h2>
          <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <InputField label='Name' {...register("name")} />
              {errors.name && (
                <p className='text-red-400'>{errors.name.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Student(s)' {...register("student")} />

              {errors.student && (
                <p className='text-red-400'>{errors.student.message}</p>
              )}
            </div>
            <div className='sm:col-span-3'>
              <InputField label='Mobile Number' {...register("phone")} />
              {errors.phone && (
                <p className='text-red-400'>{errors.phone.message}</p>
              )}
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
          title={mode === "create" ? "Register Parent" : "Update Parent"}
          type='submit'
          bgColor='bg-brand'
          textColor='text-white'
          loading={loading}
        />
      </div>
    </form>
  )
}
export default ParentForm
