import { LucideIcon } from "lucide-react"

type IconButtonProps = {
  icon: LucideIcon
  bgColor?: string
  iconColor?: string
  onClick?: () => void
}

const IconButton = ({
  icon: Icon,
  bgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  onClick,
}: IconButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`w-8 h-8 flex items-center justify-center rounded-full p-2 cursor-pointer ${bgColor}`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </button>
    </>
  )
}

export default IconButton
