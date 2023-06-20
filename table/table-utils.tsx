import { BaseColumnProps } from './columns/column'

export function getCellData({ column, tableEntry }: BaseColumnProps) {
  const data = tableEntry[column.accessor as string]

  const redirectIdentifier = column.redirectIdentifier
    ? tableEntry[column.redirectIdentifier]
    : data

  return {
    data,
    redirectIdentifier,
  }
}
