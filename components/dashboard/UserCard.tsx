import { Ellipsis } from "lucide-react"

type UserCardProps = {
  type: string
  count: number
}

const UserCard = ({ type, count }: UserCardProps) => {
  const getAcademicYear = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1 // 1-12

    // Academic year starts in April
    if (month >= 4) {
      return `${year}-${String(year + 1).slice(-2)}`
    }

    return `${year - 1}-${String(year).slice(-2)}`
  }
  return (
    <div className='rounded-2xl bg-card   p-4 flex-1 min-w-[130]'>
      <div className='flex justify-between items-center mb-2'>
        <span className='bg-white dark:bg-[#153255] rounded-md px-2 py-1 text-xs'>
          {getAcademicYear()}
        </span>
        <Ellipsis />
      </div>
      <h2 className='text-2xl font-semibold mb-2'>{count}</h2>
      <h4 className='capitalize font-medium text-gray-900 dark:text-gray-400'>
        {type}
      </h4>
    </div>
  )
}

export default UserCard
