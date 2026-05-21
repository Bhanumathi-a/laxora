"use client"

import {
  ArrowDownWideNarrow,
  FilePenLine,
  Plus,
  SlidersHorizontal,
  Trash2,
  User,
} from "lucide-react"
import { useState } from "react"

import { studentsData } from "@/lib/data"
import Table from "@/components/ui/Table"

import Image from "next/image"

import IconButton from "@/components/ui/IconButton"
import { SearchBox } from "@/components/ui/SearchBox"
import FormModal from "../forms/FormModal"
import StudentForm from "../forms/student/StudentForm"

const StudentTable = () => {
  const [open, setOpen] = useState(false)
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
      header: "Grade",
      accessor: "grade",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Address",
      accessor: "address",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ]
  type Student = {
    id: number
    name: string
    class: string
    studentId: string
    grade: number
    phone: string
    address: string
    image: string
  }
  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-lighter'>
      <td className='flex items-center gap-4 p-4'>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={40}
            height={40}
            className='w-10 h-10 rounded-full object-cover'
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
            <User className='w-5 h-5 text-gray-500' />
          </div>
        )}

        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.name}</h3>
          <p className='text-xs text-gray-500'>{item.class}</p>
        </div>
      </td>

      <td>{item.studentId}</td>
      <td>{item.grade}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>
      {role === "ADMIN" && (
        <td>
          <div className='flex items-center gap-2'>
            <IconButton
              icon={FilePenLine}
              bgColor='bg-blue-lighter'
              iconColor='text-blue-dark'
              onClick={() => setOpen(true)}
            />
            <IconButton
              icon={Trash2}
              bgColor='bg-red-200'
              iconColor='text-blue-dark'
            />
          </div>
        </td>
      )}
    </tr>
  )

  const role = "ADMIN"
  return (
    <>
      <div className='h-full m-4 mt-0 bg-white p-4 rounded-md'>
        <div className='flex flex-col md:flex-row  items-center justify-between'>
          <div className=' text-lg font-semibold my-4'>All Students</div>
          <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
            {/* <TableSearch /> */}
            <SearchBox />
            <div className='flex items-center gap-4 self-end'>
              <IconButton
                icon={SlidersHorizontal}
                bgColor='bg-blue-lighter'
                iconColor='text-blue-dark'
              />
              <IconButton
                icon={ArrowDownWideNarrow}
                bgColor='bg-blue-lighter'
                iconColor='text-blue-dark'
              />
              {role === "ADMIN" && (
                <IconButton
                  icon={Plus}
                  bgColor='bg-blue-lighter'
                  iconColor='text-blue-dark'
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        <Table columns={columns} data={studentsData} renderRow={renderRow} />
        {/* <Pagination /> */}
      </div>

      <FormModal open={open} setOpen={setOpen}>
        <StudentForm mode='create' />
      </FormModal>
      {/* <FormModal open={open} setOpen={setOpen}>
        <StudentForm mode='edit' />
      </FormModal> */}
    </>
  )
}

export default StudentTable
