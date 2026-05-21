import InputField from "../shared/InputField"
import ImageUpload from "../shared/ImageUpload"
import InputButton from "../shared/InputButton"
import { useState } from "react"
import SelectField from "../shared/SelectField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StudentFormData, studentSchema } from "@/lib/validations/student"

type StudentFormProps = {
  mode: "create" | "edit"
  //   studentData?: Student
}

const StudentForm = ({ mode }: StudentFormProps) => {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: StudentFormData) => {
    console.log(data)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
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
          title='Reset'
          type='button'
          bgColor='bg-gray-300'
          textColor='text-black'
          onClick={() => reset()}
        />
        <InputButton
          title='Register Student'
          type='submit'
          bgColor='bg-brand'
          textColor='text-white'
          loading={loading}
          //   onClick={() => setOpen(false)}
        />
      </div>
    </form>
  )
}

export default StudentForm
