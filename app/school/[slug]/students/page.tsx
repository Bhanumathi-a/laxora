import React from "react"

const StudentList = () => {
  return (
    <>
      <div className='h-full m-4 mt-0 bg-white p-4 rounded-md'>
        <div className='flex flex-col md:flex-row  items-center justify-between'>
          <div className=' text-lg font-semibold my-4'>All Students</div>
          <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
            {/* <TableSearch /> */}
            <div className='flex items-center gap-4 self-end'>
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-vsSky'>
                {/* <Image src='/filter.png' alt='filter' width={14} height={14} /> */}
              </button>
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-vsSky'>
                {/* <Image src='/sort.png' alt='sort' width={14} height={14} /> */}
              </button>
              {/* {role === "admin" && (
                // <button className='w-8 h-8 flex items-center justify-center rounded-full bg-vsSky'>
                //   <Image src='/create.png' alt='plus' width={14} height={14} />
                // </button>
                // <FormModal table='student' type='create' />
              )} */}
            </div>
          </div>
        </div>
        {/* <Table columns={columns} renderRow={renderRow} data={studentsData} />
        <Pagination /> */}
      </div>
    </>
  )
}

export default StudentList
