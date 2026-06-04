import { UseFormRegisterReturn } from "react-hook-form"

type SelectOption = {
  label: string
  value: string
}

type SelectFieldProps = {
  label: string
  name: string
  options: SelectOption[]
  register?: UseFormRegisterReturn
}

const SelectField = ({ label, name, options, register }: SelectFieldProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={name} className='text-sm font-medium text-gray-700'>
        {label}
      </label>

      <select
        id={name}
        {...register}
        className='w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-main'>
        <option value=''>Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
