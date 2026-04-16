"use client"

import { useEffect, useState } from "react"

type School = {
  id: string
  name: string
}

export default function Dashboard() {
  const [name, setName] = useState("")
  const [schools, setSchools] = useState<School[]>([])

  // Fetch schools
  const fetchSchools = async () => {
    try {
      const res = await fetch("/api/schools")

      if (!res.ok) {
        console.log("API failed")
        return
      }

      const data = await res.json()

      if (data?.schools) {
        setSchools(data.schools)
        console.log(data)
      }
    } catch (error) {
      console.log("Fetch error:", error)
    }
  }

  // Run on load
  useEffect(() => {
    fetchSchools()
  }, [])

  // Add school
  const addSchool = async () => {
    if (!name) return

    await fetch("/api/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    setName("")
    fetchSchools()
  }

  // Delete school
  const deleteSchool = async (id: string) => {
    await fetch(`/api/schools/${id}`, {
      method: "DELETE",
    })

    fetchSchools()
  }

  // Edit school
  const editSchool = async (id: string) => {
    const newName = prompt("Enter new name")

    if (!newName) return

    await fetch(`/api/schools/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })

    fetchSchools()
  }

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold'>Laxora Dashboard</h1>

      {/* Add School */}
      <div className='mt-6'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='School name'
          className='border p-2'
        />
        <button
          onClick={addSchool}
          className='ml-2 bg-blue-500 text-white px-4 py-2'>
          Add
        </button>
      </div>

      {/* List Schools */}
      <div className='mt-6'>
        {schools.length === 0 ? (
          <p>No schools found</p>
        ) : (
          schools.map((s) => (
            <div key={s.id} className='flex justify-between border p-2 mt-2'>
              <span>{s.name}</span>

              <div className='flex gap-2'>
                <button
                  onClick={() => editSchool(s.id)}
                  className='text-blue-500'>
                  Edit
                </button>

                <button
                  onClick={() => deleteSchool(s.id)}
                  className='text-red-500'>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
