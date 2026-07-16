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
import { SchoolClass } from "@/types/schoolClass"
import { Circle, CircleCheckBig } from "lucide-react"
import FormStepper from "../FormStepper"
import { studentSteps } from "@/lib/formSteps"

type StudentFormProps = {
  mode: "create" | "edit"
  studentData?: Student
  setOpen: (open: boolean) => void
  students: Student[]
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
  SchoolClasses: SchoolClass[]
}
const StudentForm = ({
  mode,
  studentData,
  setOpen,
  students,
  setStudents,
  SchoolClasses,
}: StudentFormProps) => {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

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
        classId: data.classId,
        image: "",
        password: data.password,
        dateOfBirth: new Date(data.dateOfBirth),
        bloodGroup: data.bloodGroup,
        previousClass: data.previousClass,
        admissionDate: new Date(data.admissionDate),
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
            classId: studentData.classId ?? "",
            password: studentData.password,
            dateOfBirth: studentData.dateOfBirth
              ? new Date(studentData.dateOfBirth).toISOString().split("T")[0]
              : "",
            bloodGroup:
              (studentData.bloodGroup as
                | "O+"
                | "O-"
                | "A+"
                | "A-"
                | "B+"
                | "B-"
                | "AB+"
                | "AB-") ?? "O+",
            previousClass: studentData.previousClass ?? "",
            admissionDate: studentData.admissionDate
              ? new Date(studentData.admissionDate).toISOString().split("T")[0]
              : "",
          }
        : {},
  })

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-5 overflow-auto'>
        <div className='border-b border-gray-900/10 pb-5'>
          <h2 className='text-lg font-semibold text-gray-900'>
            {mode === "create" ? "Register Student" : "Update Student"}
          </h2>
        </div>
        <FormStepper currentStep={currentStep} />
      </div>
      <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        {currentStep === 0 && (
          <>
            <div className='sm:col-span-2'>
              <InputField label='First name' {...register("firstName")} />
              {errors.firstName && (
                <p className='text-red-400'>{errors.firstName.message}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <InputField label='Last name' {...register("lastName")} />
              {errors.lastName && (
                <p className='text-red-400'>{errors.lastName.message}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <InputField label='Student ID' {...register("studentId")} />
              {errors.studentId && (
                <p className='text-red-400'>{errors.studentId.message}</p>
              )}
            </div>
            <div className='sm:col-span-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <InputField
                  label='Student Date of Birth'
                  type='date'
                  {...register("dateOfBirth")}
                />
                {errors.dateOfBirth && (
                  <p className='text-red-400'>{errors.dateOfBirth.message}</p>
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
              {mode === "create" && (
                <>
                  <div className='sm:col-span-3'>
                    <InputField
                      label='Password'
                      {...register("password")}
                      type='password'
                    />
                    {errors.password && (
                      <p className='text-red-400'>{errors.password.message}</p>
                    )}
                  </div>
                  <div className='sm:col-span-3'>
                    <InputField
                      label='Confirm Password'
                      {...register("password")}
                      type='password'
                    />
                    {errors.password && (
                      <p className='text-red-400'>{errors.password.message}</p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className='sm:col-span-2'>
              <ImageUpload />
            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            <div className='sm:col-span-2'>
              <InputField
                label='Email Address'
                {...register("email")}
                type='email'
              />
              {errors.email && (
                <p className='text-red-400'>{errors.email.message}</p>
              )}
            </div>

            <div className='sm:col-span-2'>
              <InputField label='Mobile Number' {...register("phone")} />
              {errors.phone && (
                <p className='text-red-400'>{errors.phone.message}</p>
              )}
            </div>

            <div className='sm:col-span-2'>
              <InputField label='Address' {...register("address")} />
              {errors.address && (
                <p className='text-red-400'>{errors.address.message}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <InputField label='City' {...register("city")} />
              {errors.city && (
                <p className='text-red-400'>{errors.city.message}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <InputField label='Zip / Pincode' {...register("pin")} />
              {errors.pin && (
                <p className='text-red-400'>{errors.pin.message}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <InputField label='State' {...register("state")} />
              {errors.state && (
                <p className='text-red-400'>{errors.state.message}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <InputField label='Country' {...register("country")} />
              {errors.country && (
                <p className='text-red-400'>{errors.country.message}</p>
              )}
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className='sm:col-span-2'>
              <SelectField
                label='Class'
                name='classId'
                options={SchoolClasses.map((schoolClass) => ({
                  label: `${schoolClass.name} - ${schoolClass.section}`,
                  value: schoolClass.id,
                }))}
                register={register("classId")}
              />
            </div>

            <div className='sm:col-span-2'>
              <InputField
                label='Admission Date'
                {...register("admissionDate")}
                type='date'
              />
              {errors.admissionDate && (
                <p className='text-red-400'>{errors.admissionDate.message}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <InputField
                label='Previous Class'
                {...register("previousClass")}
              />
              {errors.previousClass && (
                <p className='text-red-400'>{errors.previousClass.message}</p>
              )}
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <div className='sm:col-span-2'>
              <InputField label='Father&#39;s Name' />
            </div>
            <div className='sm:col-span-2'>
              <InputField label='Mother&#39;s Name' />
            </div>
            <div className='sm:col-span-2'>
              <InputField label='Gardien&#39;s Name' />
            </div>
          </>
        )}
        {currentStep === 4 && (
          <>
            <div className='sm:col-span-3'>
              <SelectField
                label='Blood Group'
                name='bloodGroup'
                options={[
                  { label: "O+", value: "O+" },
                  { label: "O-", value: "O-" },
                  { label: "A+", value: "A+" },
                  { label: "A-", value: "A-" },
                  { label: "B+", value: "B+" },
                  { label: "B-", value: "B-" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB-", value: "AB-" },
                ]}
                register={register("bloodGroup")}
              />
              {errors.bloodGroup && (
                <p className='text-red-400'>{errors.bloodGroup.message}</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className='mt-6 flex items-center justify-end gap-x-6'>
        {currentStep > 0 && (
          <InputButton
            title='Previous'
            type='button'
            bgColor='bg-brand'
            textColor='text-white'
            onClick={handlePrevious}
          />
        )}

        {currentStep < 4 ? (
          <InputButton
            title='Next'
            type='button'
            bgColor='bg-brand'
            textColor='text-white'
            onClick={handleNext}
          />
        ) : (
          <InputButton
            title={mode === "create" ? "Register Student" : "Update Student"}
            type='submit'
            bgColor='bg-brand'
            textColor='text-white'
            loading={loading}
          />
        )}

        {/* <InputButton
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
        */}
      </div>
    </form>
  )
}
export default StudentForm
