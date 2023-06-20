import './table-footer.scss'
import { useState } from 'react'
import { TablePagination } from './table-pagination'
import { TableState, TableStore } from '../table'

export const Options: any[] = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
]

type TableFooterProps<M, F> = {
  store: TableStore<M, F>
  showPagination: boolean
  showPageSize?: boolean
  state: TableState
}

export function TableFooter<M, F>({
  store,
  showPagination,
  state,
  showPageSize,
}: TableFooterProps<M, F>) {
  const { tableFilter: filter, setFilter, tableData } = store
  const { page: pg } = filter
  const { pageNumber, pageSize } = pg
  const r_no_of_items = tableData?.numberOfItems || 0

  const page = {
    pageNumber: (pageNumber as number) + 1,
    pageSize: pageSize as number,
  }

  const value = { label: page.pageSize + '', value: page.pageSize + '' }
  const [showPaginationLocal] = useState<boolean>(showPagination)

  const setPageSize = (pageSize: number) => {
    if (pageSize * page.pageNumber > r_no_of_items) {
      const pageNumber = Math.floor(
        (r_no_of_items / pageSize) * page.pageNumber,
      )

      setFilter({
        ...filter,
        page: { pageNumber, pageSize },
      })
    } else {
      setFilter({
        ...filter,
        page: {
          ...filter.page,
          pageSize: pageSize,
        },
      })
    }
  }

  function checkIfPageSizeIsNeeded() {
    const itemNo = Number(tableData?.numberOfItems)
    const itemsPerPage = Number(filter.page.pageSize)
    if (itemNo < itemsPerPage && pageSize === 10) {
      return false
    }
    return true
  }

  if (!showPaginationLocal || state === TableState.RECEIVED_NO_DATA) {
    return null
  }

  return (
    <div className='table-footer'>
      {checkIfPageSizeIsNeeded() && showPageSize && (
        <div className='w-40 c1-r1'>
          {/* <CustomSelect
            placeholder={'Page Size'}
            value={value}
            options={Options}
            className='w-[70px]'
            onChange={(e: any) => {
              setPageSize(e.value)
            }}
          /> */}
        </div>
      )}
      <TablePagination store={store} />
    </div>
  )
}
