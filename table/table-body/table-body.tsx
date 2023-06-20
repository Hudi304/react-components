import { TableColumn, computeColumnWidth } from '../table'
import './table-body.scss'

type TableHeaderProps = {
  className?: string
  data: any[]
  columns: TableColumn[]
  maxHeight?: string
  tableRef: any
  itemHeight: number
}

/**
 * ### TableBody
 * TableBody displays the data received after awaiting
 * the A.P.I. call.
 * - The most important prop of this component is columns.
 * - It represents a components that will be rendered on every table cell.
 * - Check the columns file to find all the implementations.
 */
export function TableBody({
  className = '',
  data,
  columns,
  maxHeight,
  tableRef,
  itemHeight,
}: TableHeaderProps): JSX.Element {
  return (
    <div
      ref={tableRef}
      className={`table-body-container c1-r2 ${className}`}
      style={{ maxHeight: maxHeight }}
    >
      {data.map((row, rowIndex) => (
        <TableRow
          key={`row-${rowIndex}`}
          rowIndex={rowIndex}
          columns={columns}
          tableEntry={row}
          itemHeight={itemHeight}
        />
      ))}
    </div>
  )
}

type TableRowProps = {
  columns: TableColumn[]
  tableEntry: any
  itemHeight: number
  rowIndex: number
}

/**
 * ### TableRow
 * TableRow renders an object from the tableData : TableResponse<M>
 */
export function TableRow({
  columns,
  tableEntry,
  itemHeight,
  rowIndex,
}: TableRowProps): JSX.Element {
  return (
    <div
      className='table-row gap-1'
      style={{ height: itemHeight, ...computeColumnWidth(columns) }}
    >
      {columns.map((col, colIndex) => {
        return (
          <TableCell
            key={`cell-${colIndex}-${rowIndex}`}
            column={col}
            tableEntry={tableEntry}
          />
        )
      })}
    </div>
  )
}

type TableCellProps = {
  column: TableColumn
  tableEntry: any
}

/**
 * ### TableCell
 * TableCell renders one or more keys of an object from tableData
 *  - the TableCell component has full access to the entire object (tableEntry) that will be rendered on the row,
 * and the column.
 *  - you can render more than one key in the same cell, or render just on cell per row for full flexibility
 */
export function TableCell({ column, tableEntry }: TableCellProps): JSX.Element {
  const data = tableEntry[column.accessor as string]

  let tooltip
  if (column.tooltipBuilder) {
    tooltip = column.tooltipBuilder(tableEntry)
  }

  const { cellComponent: Component } = column
  return tooltip ? (
    <div className='table-cell has-tooltip'>
      <Component column={column} tableEntry={tableEntry}>
        {data}
        <div className='tooltip max-w-[900px] rounded shadow-lg p-2 -mt-25 overflow-x-hidden'>
          <pre className='overflow-hidden'>{tooltip}</pre>
        </div>
      </Component>
    </div>
  ) : (
    <div className='table-cell'>
      <Component column={column} tableEntry={tableEntry}>
        {data}
      </Component>
    </div>
  )
}
