import React, { useEffect, useState } from "react"
import FormModal from "../forms/FormModal"
import { Holiday } from "@/types/holiday"
import toast from "react-hot-toast"

type HolidayModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  holiday: Holiday | null
  date: Date | null
  schoolId: string
  onSaved: () => void
}

const HolidayModal = ({
  open,
  setOpen,
  holiday,
  date,
  schoolId,
  onSaved,
}: HolidayModalProps) => {
  const [title, setTitle] = useState(holiday?.title ?? "")
  const [type, setType] = useState(holiday?.type ?? "SCHOOL")

  useEffect(() => {
    if (!open) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(holiday?.title ?? "")
    setType(holiday?.type ?? "SCHOOL")
  }, [holiday, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return
    const isEditing = !!holiday
    const url = isEditing ? `/api/holiday/${holiday.id}` : "/api/holiday"
    const method = isEditing ? "PUT" : "POST"
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        type,
        date: date.toISOString(),
        schoolId,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      toast.error(data.message)
      return
    }

    toast.success(isEditing ? "Holiday updated" : "Holiday created")
    setOpen(false)
    setTimeout(() => {
      onSaved()
    }, 0)
  }

  const handleDelete = async () => {
    if (!holiday) return
    const response = await fetch(`/api/holiday/${holiday.id}`, {
      method: "DELETE",
    })
    const data = await response.json()
    if (!response.ok) {
      toast.error(data.message)
      return
    }
    toast.success("Holiday deleted")
    setOpen(false)
    setTimeout(() => {
      onSaved()
    }, 0)
  }

  return (
    <>
      <FormModal open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit}>
          <div className='space-y-12 scroll-auto'>
            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='text-base/7 font-semibold text-gray-900'>
                {holiday ? "Edit Holiday" : "Add Holiday"}
              </h2>
              <div className='mt-4 grid grid-row gap-x-6 gap-y-8 '>
                <div className='w-full'>
                  Date:
                  {date?.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className='w-full'>
                  <label className='block mb-2 text-sm font-medium'>
                    Holiday Title
                  </label>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Holiday title'
                    className='border rounded-lg p-2 w-full'
                  />
                </div>
                <div className='w-full'>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as "SCHOOL" | "PUBLIC")
                    }
                    className='border rounded-lg p-2 w-full bg-white dark:bg-brand text-gray-500'>
                    <option value='SCHOOL'>School Holiday</option>
                    <option value='PUBLIC'>Public Holiday</option>
                  </select>
                </div>
              </div>
              <div className='flex justify-end gap-3 mt-6'>
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  className='px-4 py-2 border rounded-lg'>
                  Cancel
                </button>
                {holiday && (
                  <button
                    type='button'
                    onClick={handleDelete}
                    className='px-4 py-2 bg-red-600 text-white rounded-lg'>
                    Delete
                  </button>
                )}
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg'>
                  {holiday ? "Edit Holiday" : "Add Holiday"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormModal>
    </>
  )
}
export default HolidayModal
