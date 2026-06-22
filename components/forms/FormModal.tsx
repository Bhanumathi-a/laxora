import IconButton from "../ui/IconButton"
import { X } from "lucide-react"

type FormModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export default function FormModal({ open, setOpen, children }: FormModalProps) {
  if (!open) return null

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-brand text-brand dark:text-blue-light2 p-6 rounded-xl w-[90%] md:w-[500px] relative overflow-scroll h-[90%]'>
        <div className='absolute top-3 right-3'>
          <IconButton
            icon={X}
            bgColor='bg-blue-lighter'
            iconColor='text-blue-dark'
            onClick={() => setOpen(false)}
          />
        </div>

        {children}
      </div>
    </div>
  )
}
