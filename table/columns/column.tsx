import { TableColumn } from '../table'

import './columns.scss'

export const TABLE_COLUMNS = {
  BLOCK_NUMBER: BlockNumber,
}

export type BaseColumnProps = {
  tableEntry?: any
  column: TableColumn
}

function getCellData({ column, tableEntry }: BaseColumnProps) {
  const data = tableEntry[column.accessor as string]

  const redirectIdentifier = column.redirectIdentifier
    ? tableEntry[column.redirectIdentifier]
    : data

  return {
    data,
    redirectIdentifier,
  }
}

export function BlockNumber(cellProps: BaseColumnProps) {
  const { data } = getCellData(cellProps)
  return <div className='block-number-column'>{data}</div>
}
