import { Search } from "lucide-react"

export const SearchBox = () => {
  return (
    <>
      <div className='hidden md:flex items-center gap-2 text-xs  ring-[1.5px] ring-brand px-2 rounded-sm'>
        <input
          type='text'
          name=''
          id=''
          placeholder='Search...'
          className='width-[200px] p-2 bg-transparent outline-none'
        />
        <Search className='text-brand  w-5 h-5' />
      </div>
    </>
  )
}
