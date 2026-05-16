type Column = {
  header: string
  accessor: string
  className?: string
}

type TableProps<T> = {
  columns: Column[]
  data: T[]
  renderRow: (item: T) => React.ReactNode
}

export default function Table<T>({ columns, data, renderRow }: TableProps<T>) {
  return (
    <table className='w-full mt-4'>
      <thead className='border-b border-gray-200'>
        <tr className='text-left text-gray-500 text-sm'>
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  )
}
