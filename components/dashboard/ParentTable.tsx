"use client"
import {
  ArrowDownWideNarrow,
  Eye,
  FilePenLine,
  Plus,
  SlidersHorizontal,
  Trash2,
  User,
} from "lucide-react"
import { useState } from "react"
import { Parent } from "@/types/parent"
// import { parentsData } from "@/lib/data"
import Table from "@/components/ui/Table"
import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import { SearchBox } from "@/components/ui/SearchBox"
import FormModal from "../forms/FormModal"
import ParentForm from "../forms/parent/ParentForm"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type ParentTableProps = {
  initialParents: Parent[]
  slug: string
}

const ParentTable = ({
  initialParents: initialParents,
  slug,
}: ParentTableProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  // sort
  const [sortBy, setSortBy] = useState("")
  const [showSort, setShowSort] = useState(false)
  // const [parents, setParents] = useState<Parent[]>(parentsData)
  const [parents, setParents] = useState<Parent[]>(initialParents)

  const sortedParents = [...parents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === "student") {
      return a.student.localeCompare(b.student)
    }
    return 0
  })
  const columns = [
    {
      header: "Parent Name",
      accessor: "name",
    },

    {
      header: "Student",
      accessor: "student",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden md:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ]
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this parent?")

    if (!confirmed) return

    try {
      const response = await fetch(`/api/parents/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast.error(result.message)
        return
      }

      toast.success("Parent deleted successfully")

      setParents((prev) => prev.filter((parent) => parent.id !== id))
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete parent")
    }
  }
  const renderRow = (item: Parent) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-lighter'>
      <td className='flex items-center gap-4 p-4'>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.name}</h3>
        </div>
      </td>
      <td>
        <p className='text-xs text-gray-500'>{item.student}</p>
      </td>

      <td className='hidden md:table-cell'>{item.phone}</td>
      <td className='hidden md:table-cell'>{item.address}</td>

      <td>
        <div className='flex items-center gap-2'>
          <IconButton
            icon={Eye}
            bgColor='bg-blue-lighter'
            iconColor='text-blue-dark'
            onClick={() => router.push(`/school/${slug}/parents/${item.id}`)}
          />
          {role === "ADMIN" && (
            <>
              <IconButton
                icon={FilePenLine}
                bgColor='bg-blue-lighter'
                iconColor='text-blue-dark'
                onClick={() => {
                  setFormMode("edit")
                  setSelectedParent(item)
                  setOpen(true)
                }}
              />
              <IconButton
                icon={Trash2}
                bgColor='bg-red-200'
                iconColor='text-blue-dark'
                onClick={() => handleDelete(item.id)}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  )
  const role = "ADMIN"
  return (
    <>
      <div className='h-full m-4 mt-0 bg-white p-4 rounded-md'>
        <div className='flex flex-col md:flex-row  items-center justify-between'>
          <div className=' text-lg font-semibold my-4'>All Parents</div>
          <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
            {/* <TableSearch /> */}
            <SearchBox />
            <div className='flex items-center gap-4'>
              <IconButton
                icon={SlidersHorizontal}
                bgColor='bg-blue-lighter'
                iconColor='text-blue-dark'
              />
              <div className='relative'>
                <IconButton
                  icon={ArrowDownWideNarrow}
                  bgColor='bg-blue-lighter'
                  iconColor='text-blue-dark'
                  onClick={() => setShowSort(!showSort)}
                />
                {showSort && (
                  <div className='absolute right-0 mt-2 bg-white shadow-lg border rounded-lg p-2 z-50 w-40'>
                    <button
                      onClick={() => {
                        setSortBy("name")
                        setShowSort(false)
                      }}
                      className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md'>
                      Sort by Name
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("grade")
                        setShowSort(false)
                      }}
                      className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md'>
                      Sort by Grade
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("parentId")
                        setShowSort(false)
                      }}
                      className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md'>
                      Sort by ID
                    </button>
                  </div>
                )}
              </div>

              {role === "ADMIN" && (
                <IconButton
                  icon={Plus}
                  bgColor='bg-blue-lighter'
                  iconColor='text-blue-dark'
                  onClick={() => {
                    setFormMode("create")
                    setSelectedParent(null)
                    setOpen(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {sortedParents.length === 0 ? (
          <div className='flex items-center justify-center py-10 text-gray-500'>
            No parents found
          </div>
        ) : (
          <Table columns={columns} data={sortedParents} renderRow={renderRow} />
        )}
        {/* <Pagination /> */}
      </div>
      <FormModal open={open} setOpen={setOpen}>
        <ParentForm
          mode={formMode}
          parentData={selectedParent || undefined}
          setOpen={setOpen}
          parents={parents}
          setParents={setParents}
        />
      </FormModal>
    </>
  )
}
export default ParentTable
