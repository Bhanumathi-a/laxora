import { Search } from "lucide-react"

export const SearchBox = () => {
  return (
    <>
      <div className='searchBox'>
        <input
          type='text'
          name=''
          id=''
          placeholder='Search...'
          className='width-[200px]  inputClass '
        />
        <Search className='text-brand dark:text-gray-100  w-5 h-5' />
      </div>
    </>
  )
}
