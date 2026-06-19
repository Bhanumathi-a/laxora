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
import { Student } from "@/types/student"
// import { studentsData } from "@/lib/data"
import Table from "@/components/ui/Table"
import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import { SearchBox } from "@/components/ui/SearchBox"
import FormModal from "../forms/FormModal"
import StudentForm from "../forms/student/StudentForm"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { SchoolClass } from "@/types/schoolClass"

type StudentTableProps = {
  initialStudents: Student[]
  schoolClasses: SchoolClass[]
  slug: string
}

const StudentTable = ({
  initialStudents: initialStudents,
  schoolClasses,
  slug,
}: StudentTableProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  // sort
  const [sortBy, setSortBy] = useState("")
  const [showSort, setShowSort] = useState(false)
  // const [students, setStudents] = useState<Student[]>(studentsData)
  const [students, setStudents] = useState<Student[]>(initialStudents)

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") {
      return a.firstName.localeCompare(b.firstName)
    }
    if (sortBy === "class") {
      return `${a.class?.name ?? ""}-${a.class?.section ?? ""}`.localeCompare(
        `${b.class?.name ?? ""}-${b.class?.section ?? ""}`,
      )
    }
    if (sortBy === "studentId") {
      return a.studentId.localeCompare(b.studentId)
    }
    return 0
  })
  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
    },
    {
      header: "class",
      accessor: "class",
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
      header: "Addmission Date",
      accessor: "admissionDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ]
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this student?")

    if (!confirmed) return

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast.error(result.message)
        return
      }

      toast.success("Student deleted successfully")

      setStudents((prev) => prev.filter((student) => student.id !== id))
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete student")
    }
  }
  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className='border-b border-gray-200  text-sm hover:bg-blue-lighter dark:hover:bg-gray-900 '>
      <td className='flex items-center gap-4 p-4'>
        <div className='hidden md:table-cell'>
          {item.image ? (
            <Image
              src={item.image}
              alt={item.firstName}
              width={40}
              height={40}
              className='w-10 h-10 rounded-full object-cover'
            />
          ) : (
            <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
              <User className='w-5 h-5 text-gray-500' />
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>
            {item.firstName} {item.lastName}
          </h3>
          {/* <p className='text-xs text-gray-500'>{item.classId}</p> */}
        </div>
      </td>
      <td>{item.studentId}</td>
      <td className='hidden md:table-cell'>
        {item.class?.name} - {item.class?.section}
      </td>
      <td className='hidden md:table-cell'>{item.phone}</td>
      <td className='hidden md:table-cell break-normal w-80'>{item.address}</td>
      <td className='hidden md:table-cell'>
        {item.admissionDate
          ? new Date(item.admissionDate).toISOString().split("T")[0]
          : "-"}
      </td>

      <td>
        <div className='flex items-center gap-2'>
          <IconButton
            icon={Eye}
            bgColor='bg-blue-lighter'
            iconColor='text-blue-dark'
            onClick={() =>
              router.push(`/school/${slug}/students/${item.studentId}`)
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
                  setSelectedStudent(item)
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
      <div className='h-full m-4 mt-0 bg-white p-4 rounded-md  dark:bg-brand '>
        <div className='flex flex-col md:flex-row  items-center justify-between'>
          <div className=' text-lg font-semibold my-4'>All Students</div>
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
                        setSortBy("classId")
                        setShowSort(false)
                      }}
                      className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md'>
                      Sort by classId
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("studentId")
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
                    setSelectedStudent(null)
                    setOpen(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {sortedStudents.length === 0 ? (
          <div className='flex items-center justify-center py-10 text-gray-500'>
            No students found
          </div>
        ) : (
          <Table
            columns={columns}
            data={sortedStudents}
            renderRow={renderRow}
          />
        )}
        {/* <Pagination /> */}
      </div>
      <FormModal open={open} setOpen={setOpen}>
        <StudentForm
          mode={formMode}
          studentData={selectedStudent || undefined}
          setOpen={setOpen}
          students={students}
          setStudents={setStudents}
          SchoolClasses={schoolClasses}
        />
      </FormModal>
    </>
  )
}
export default StudentTable
