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
import { Subject } from "@/types/subject"
// import { subjectData } from "@/lib/data"
import Table from "@/components/ui/Table"
import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import { SearchBox } from "@/components/ui/SearchBox"
import FormModal from "../forms/FormModal"
import SubjectForm from "../forms/subject/subjectForm"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Teacher } from "@/types/teacher"

type SubjectTableProps = {
  initialsubject: Subject[]
  teachers: Teacher[]
  slug: string
}

const SubjectTable = ({
  initialsubject: initialsubject,
  teachers,
  slug,
}: SubjectTableProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  // sort
  const [sortBy, setSortBy] = useState("")
  const [showSort, setShowSort] = useState(false)
  // const [subject, setsubject] = useState<Subject[]>(subjectData)
  const [subject, setsubject] = useState<Subject[]>(initialsubject)

  const sortedsubject = [...subject].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }

    return 0
  })
  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },

    {
      header: "Teacher",
      accessor: "teacher",
    },

    {
      header: "Actions",
      accessor: "action",
    },
  ]
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this Subject?")

    if (!confirmed) return

    try {
      const response = await fetch(`/api/subject/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast.error(result.message)
        return
      }

      toast.success("Subject deleted successfully")

      setsubject((prev) => prev.filter((subject) => subject.id !== id))
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete Subject")
    }
  }
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-lighter'>
      <td className='flex items-center gap-4 p-4'>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.name}</h3>
        </div>
      </td>
      <td>
        {item.teacher ? (
          <button
            onClick={() =>
              router.push(`/school/${slug}/teachers/${item.teacher?.teacherId}`)
            }
            className='text-blue-600 hover:underline'>
            {item.teacher.firstName} {item.teacher.lastName}
          </button>
        ) : (
          <span className='text-gray-400'>Not assigned</span>
        )}
      </td>

      <td>
        <div className='flex items-center gap-2'>
          <IconButton
            icon={Eye}
            bgColor='bg-blue-lighter'
            iconColor='text-blue-dark'
            onClick={() => router.push(`/school/${slug}/subject/${item.id}`)}
          />
          {role === "ADMIN" && (
            <>
              <IconButton
                icon={FilePenLine}
                bgColor='bg-blue-lighter'
                iconColor='text-blue-dark'
                onClick={() => {
                  setFormMode("edit")
                  setSelectedSubject(item)
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
          <div className=' text-lg font-semibold my-4'>All Subjects</div>
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
                      Sort by Subject
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("grade")
                        setShowSort(false)
                      }}
                      className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md'>
                      Sort by teacher
                    </button>
                    {/* <button
                      onClick={() => {
                        setSortBy("subjectId")
                        setShowSort(false)
                      }}
                      className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md'>
                      Sort by ID
                    </button> */}
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
                    setSelectedSubject(null)
                    setOpen(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {sortedsubject.length === 0 ? (
          <div className='flex items-center justify-center py-10 text-gray-500'>
            No Subject found
          </div>
        ) : (
          <Table columns={columns} data={sortedsubject} renderRow={renderRow} />
        )}
        {/* <Pagination /> */}
      </div>
      <FormModal open={open} setOpen={setOpen}>
        <SubjectForm
          mode={formMode}
          subjectData={selectedSubject || undefined}
          setOpen={setOpen}
          subject={subject}
          setsubject={setsubject}
          teachers={teachers}
        />
      </FormModal>
    </>
  )
}
export default SubjectTable
