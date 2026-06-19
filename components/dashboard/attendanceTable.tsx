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
import { Attendance } from "@/types/attendance"
// import { attendancesData } from "@/lib/data"
import Table from "@/components/ui/Table"
import Image from "next/image"
import IconButton from "@/components/ui/IconButton"
import { SearchBox } from "@/components/ui/SearchBox"
import FormModal from "../forms/FormModal"
import AttendanceForm from "../forms/attendance/AttendanceForm"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Student } from "@/types/student"

type AttendanceTableProps = {
  initialAttendances: Attendance[]
  students: Student[]
  slug: string
}

const AttendanceTable = ({
  initialAttendances: initialAttendances,
  students,
  slug,
}: AttendanceTableProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  // sort
  const [sortBy, setSortBy] = useState("")
  const [showSort, setShowSort] = useState(false)
  // const [attendances, setAttendances] = useState<Attendance[]>(attendancesData)
  const [attendances, setAttendances] =
    useState<Attendance[]>(initialAttendances)

  // const sortedAttendances = [...attendances].sort((a, b) => {
  //   if (sortBy === "name") {
  //     return a.firstName.localeCompare(b.firstName)
  //   }
  //   if (sortBy === "class") {
  //     return `${a.class?.name ?? ""}-${a.class?.section ?? ""}`.localeCompare(
  //       `${b.class?.name ?? ""}-${b.class?.section ?? ""}`,
  //     )
  //   }
  //   if (sortBy === "attendanceId") {
  //     return a.attendanceId.localeCompare(b.attendanceId)
  //   }
  //   return 0
  // })
  const columns = [
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ]
  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this attendance?",
    )

    if (!confirmed) return

    try {
      const response = await fetch(`/api/attendance/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        console.log(result.message)
        toast.error(result.message)
        return
      }

      toast.success("Attendance deleted successfully")

      setAttendances((prev) =>
        prev.filter((attendance) => attendance.id !== id),
      )
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete attendance")
    }
  }
  const renderRow = (item: Attendance) => (
    <tr
      key={item.id}
      className='border-b border-gray-200  text-sm hover:bg-blue-lighter dark:border-gray-800'>
      <td className='flex items-center gap-4 p-4'>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>
            {item.student
              ? `${item.student.firstName} ${item.student.lastName}`
              : "Unknown Student"}
          </h3>
        </div>
      </td>
      <td className='hidden md:table-cell'>
        {new Date(item.date).toISOString().split("T")[0]}
      </td>
      <td className='hidden md:table-cell'>{item.status}</td>
      <td>
        <div className='flex items-center gap-2'>
          <IconButton
            icon={Eye}
            bgColor='bg-blue-lighter'
            iconColor='text-blue-dark'
            onClick={() => router.push(`/school/${slug}/attendance/${item.id}`)}
          />
          {role === "ADMIN" && (
            <>
              <IconButton
                icon={FilePenLine}
                bgColor='bg-blue-lighter'
                iconColor='text-blue-dark'
                onClick={() => {
                  setFormMode("edit")
                  setSelectedAttendance(item)
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
          <div className=' text-lg font-semibold my-4'>All Attendances</div>
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
                {/* {showSort && (
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
                        setSortBy("attendanceId")
                        setShowSort(false)
                      }}
                      className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md'>
                      Sort by ID
                    </button>
                  </div>
                )} */}
              </div>

              {role === "ADMIN" && (
                <IconButton
                  icon={Plus}
                  bgColor='bg-blue-lighter'
                  iconColor='text-blue-dark'
                  onClick={() => {
                    setFormMode("create")
                    setSelectedAttendance(null)
                    setOpen(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {/* {sortedAttendances.length === 0 ? (
          <div className='flex items-center justify-center py-10 text-gray-500'>
            No attendances found
          </div>
        ) : ( */}
        <Table columns={columns} data={attendances} renderRow={renderRow} />
        {/* )} */}
        {/* <Pagination /> */}
      </div>
      <FormModal open={open} setOpen={setOpen}>
        <AttendanceForm
          mode={formMode}
          attendanceData={selectedAttendance || undefined}
          setOpen={setOpen}
          attendance={attendances}
          setattendance={setAttendances}
          students={students}
        />
      </FormModal>
    </>
  )
}
export default AttendanceTable
