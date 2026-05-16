import {
  ArrowDownWideNarrow,
  FilePenLine,
  Plus,
  SlidersHorizontal,
  Trash2,
  User,
} from "lucide-react"
import React from "react"
import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import Table from "@/components/ui/Table"

import { studentsData } from "@/lib/data"
import Image from "next/image"

type Props = {
  params: Promise<{
    slug: string
  }>
}

const StudentList = async ({ params }: Props) => {
  const { slug } = await params
  const school = await prisma.school.findUnique({
    where: { slug },
  })

  if (!school) {
    return <div>School not found</div>
  }
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

      <td>
        <div className='flex items-center gap-2'>
          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-lighter p-2'>
            <FilePenLine />
          </button>

          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-red-200 p-2'>
            <Trash2 />
          </button>
        </div>
      </td>
    </tr>
  )
  return (
    <>
      <div className='h-screen flex'>
        <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
          <Sidebar role='ADMIN' slug={slug} schoolName={school.name} />
        </div>
        <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] flex flex-col'>
          <Header />
          <div className='h-full m-4 mt-0 bg-white p-4 rounded-md'>
            <div className='flex flex-col md:flex-row  items-center justify-between'>
              <div className=' text-lg font-semibold my-4'>All Students</div>
              <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                {/* <TableSearch /> */}
                <div className='flex items-center gap-4 self-end'>
                  <button className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-lighter p-2  '>
                    <SlidersHorizontal className='' />
                  </button>
                  <button className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-lighter p-2'>
                    <ArrowDownWideNarrow />
                  </button>
                  {/* {role === "admin" && ( */}
                  <button className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-lighter p-2'>
                    <Plus />
                  </button>
                  {/* <FormModal table='student' type='create' />
              )} */}
                </div>
              </div>
            </div>

            <Table
              columns={columns}
              data={studentsData}
              renderRow={renderRow}
            />
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentList
