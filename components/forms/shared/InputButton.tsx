import { LucideIcon } from "lucide-react"

type InputButtonProps = {
  title: string
  type?: "button" | "submit" | "reset"
  bgColor?: string
  textColor?: string
  onClick?: () => void
  icon?: LucideIcon
  loading?: boolean
  disabled?: boolean
}

const InputButton = ({
  title,
  type = "button",
  bgColor = "bg-brand",
  textColor = "text-white",
  onClick,
  icon,
  loading = false,
  disabled = false,
}: InputButtonProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <button
        type={type}
        onClick={onClick}
        className={`mt-5 px-4 py-2 rounded-lg font-semibold tracking-wide transition duration-300 cursor-pointer ${bgColor} ${textColor}  ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:opacity-90"
        }`}>
        {loading ? "Loading..." : title}
      </button>
    </div>
  )
}

export default InputButton
