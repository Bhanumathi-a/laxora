export default async function SchoolDashboard({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold'>School Dashboard</h1>
      <div>School ID: {id}</div>
      <div className='mt-6'>
        <p>Students</p>
        <p>Teachers</p>
      </div>
    </div>
  )
}
