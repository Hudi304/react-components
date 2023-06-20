import { TableColumn, computeColumnWidth } from '../table'
import './table-header.scss'

type TableHeaderProps = {
  columns: TableColumn[]
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <div
      className='table-header-container border-bottom gap-1'
      style={computeColumnWidth(columns)}
    >
      {columns.map((column, columnIndex) => {
        return (
          <div
            className='inline-block resize-x'
            key={`header-cell-${columnIndex}`}
          >
            {column.label}
          </div>
        )
      })}
    </div>
  )
}
