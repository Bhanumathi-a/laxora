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
import { SchoolClass } from "@/types/schoolClass"
// import { schoolClassData } from "@/lib/data"
import Table from "@/components/ui/Table"
import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import { SearchBox } from "@/components/ui/SearchBox"
import FormModal from "../forms/FormModal"
import SchoolClassForm from "../forms/schoolClass/schoolClassForm"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Subject } from "@/types/subject"

type SchoolClassTableProps = {
  initialschoolClass: SchoolClass[]
  subjects: Subject[]
  slug: string
}

const SchoolClassTable = ({
  initialschoolClass: initialschoolClass,
  subjects,
  slug,
}: SchoolClassTableProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedSchoolClass, setSelectedSchoolClass] =
    useState<SchoolClass | null>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  // sort
  const [sortBy, setSortBy] = useState("")
  const [showSort, setShowSort] = useState(false)
  // const [schoolClass, setschoolClass] = useState<SchoolClass[]>(schoolClassData)
  const [schoolClass, setschoolClass] =
    useState<SchoolClass[]>(initialschoolClass)

  const sortedschoolClass = [...schoolClass].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }

    return 0
  })
  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },

    {
      header: "Section",
      accessor: "section",
    },
    {
      header: "capacity",
      accessor: "capacity",
      className: "hidden md:table-cell",
    },
    {
      header: "subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },

    {
      header: "Actions",
      accessor: "action",
    },
  ]
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this Class?")

    if (!confirmed) return

    try {
      const response = await fetch(`/api/schoolClass/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast.error(result.message)
        return
      }

      toast.success("Class deleted successfully")

      setschoolClass((prev) =>
        prev.filter((schoolClass) => schoolClass.id !== id),
      )
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete Class")
    }
  }
  const renderRow = (item: SchoolClass) => (
    <tr
      key={item.id}
      className='border-b border-gray-200  text-sm hover:bg-blue-lighter dark:hover:bg-gray-900 '>
      <td className='flex items-center gap-4 p-4'>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.name}</h3>
        </div>
      </td>
      <td>
        <p className='text-xs text-gray-500'>{item.section}</p>
      </td>
      <td className='hidden md:table-cell'>{item.capacity}</td>

      <td className='hidden md:table-cell'>
        {item.subjects?.length
          ? item.subjects.map((s) => s.name).join(", ")
          : "No subject"}
      </td>
      <td>
        <div className='flex items-center gap-2'>
          <IconButton
            icon={Eye}
            bgColor='bg-blue-lighter'
            iconColor='text-blue-dark'
            onClick={() =>
              router.push(`/school/${slug}/schoolClass/${item.id}`)
            }
          />
          {role === "ADMIN" && (
            <>
              <IconButton
                icon={FilePenLine}
                bgColor='bg-blue-lighter'
                iconColor='text-blue-dark'
                onClick={() => {
                  setFormMode("edit")
                  setSelectedSchoolClass(item)
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
          <div className=' text-lg font-semibold my-4'>All Classes</div>
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
                        setSortBy("schoolClassId")
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
                    setSelectedSchoolClass(null)
                    setOpen(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {sortedschoolClass.length === 0 ? (
          <div className='flex items-center justify-center py-10 text-gray-500'>
            No Classs found
          </div>
        ) : (
          <Table
            columns={columns}
            data={sortedschoolClass}
            renderRow={renderRow}
          />
        )}
        {/* <Pagination /> */}
      </div>
      <FormModal open={open} setOpen={setOpen}>
        <SchoolClassForm
          mode={formMode}
          schoolClassData={selectedSchoolClass || undefined}
          setOpen={setOpen}
          schoolClass={schoolClass}
          setschoolClass={setschoolClass}
          subjects={subjects}
        />
      </FormModal>
    </>
  )
}
export default SchoolClassTable
