import { isArr, isEmptyArr } from '@/utils/utils'
import { TableLoader } from './table-loader'
import { TablePlaceholder } from './table-placeholder'
import { FC, useEffect, useRef, useState } from 'react'
import { TableFilter, TableResponse } from '@/api/api.types'
import { TableBody } from './table-body/table-body'
import { TableHeader } from './table-header/table-header'
import { TableFooter } from './table-footer/table-footer'

import './table.scss'


export enum TableState {
  NO_DATA = 'NO_DATA',

  GET_DATA = 'GET_DATA',
  GET_NEW_PAGE = 'GET_NEW_PAGE',
  // GET_NEW_PAGE_SIZE = "GET_NEW_PAGE_SIZE",

  PENDING_DATA = 'PENDING_DATA',

  RECEIVED_NO_RESPONSE = 'RECEIVED_NO_RESPONSE',
  RECEIVED_NO_DATA = 'RECEIVED_NO_DATA',
  RECEIVED_DATA = 'RECEIVED_DATA',

  ERROR = 'ERROR',
}

/**
 * ### TableStore
 * TableStore is an abstraction for the repetitive logic behind the Table.
 * It is responsible of the data, filters, the loading boolean and number of items
 * the query can provide with the current filters.
 * - if you respect this contract every table should work exactly in the same way.
 */
// I am not sure about both loadTableData (with filters) and setFilter
export type TableStore<M, F> = {
  tableData?: TableResponse<M>
  tableFilter: TableFilter<F>
  setFilter: (tableData: TableFilter<F>) => void
  loadTableData: (filter: TableFilter<F>, uniqueIdentifier?: string) => any
  isTableLoading: boolean
  numberOfFilters: number
  setNumberOfFilters: (numberOfFilters: number) => void
}

export function computeColumnWidth(columns: TableColumn[]) {
  return {
    display: 'grid',
    gridTemplateColumns: columns.map((c) => c.fraction || '1fr').join(' '),
  }
}

/**
 * ### TableColumn
 * The Table component is a prop that dictates how every cell on the same column should be rendered.
 */
export type TableColumn = {
  accessor: string
  tooltipBuilder?: (entry: any) => string | undefined
  label: string
  cellComponent: FC<any>
  redirectIdentifier?: string
  fraction?: string
  charNo?: number | 'full'
  haveThreeDots?: boolean
}

export type TableProps<M, F> = {
  className?: string
  columns: TableColumn[]
  maxHeight?: string
  itemHeight?: number
  store: TableStore<M, F>
  uniqueIdentifier?: string
  initialFilterVales?: F

  showPagination?: boolean
  showPageSize?: boolean
  stopRefreshOnFilter?: boolean
  stopRefreshOnPageSize?: boolean
}

/**
 * ### Table
 * The Table component was designed around the TableStore<M, F>.
 * - It will call the loadTableData function on the first render
 * and every time the tableFilter is updated.
 * - You can use the createTableStore_OBJ<M, F> in order to populate
 * a zustand store for it or implement it yourself
 * - The most important prop of this component is columns.
 * It represents a components that will be rendered on every table cell of a column.
 * - Check the columns file for implementations.
 */
export function Table<M, F>({
  className,
  columns,
  maxHeight,
  itemHeight = 50,
  store,
  initialFilterVales,
  uniqueIdentifier,
  showPagination = false,
  showPageSize = false,
  stopRefreshOnFilter = false,
  stopRefreshOnPageSize = false,
}: TableProps<M, F>): JSX.Element {
  const tableRef = useRef<HTMLDivElement>(null)
  const { tableData, loadTableData, tableFilter: filter } = store
  const data = tableData?.data || []

  const {
    GET_DATA,
    NO_DATA,
    PENDING_DATA,
    RECEIVED_NO_RESPONSE,
    RECEIVED_NO_DATA,
    GET_NEW_PAGE,
    RECEIVED_DATA,
    ERROR,
  } = TableState
  const [state, setState] = useState<TableState>(NO_DATA)
  const [gridData, setGridData] = useState<M[]>(data || [])
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (uniqueIdentifier !== undefined) {
      const start_up_filter = { ...filter, uniqueIdentifier }
      store.setFilter(start_up_filter)
    }
    setState(GET_DATA)
  }, [])

  //? CALL THE API and get data
  useEffect(() => {
    if (state === GET_DATA || state === GET_NEW_PAGE) {
      let new_filter = { ...filter, uniqueIdentifier }

      if (initialFilterVales) {
        new_filter = {
          ...new_filter,
          options: { ...initialFilterVales, ...new_filter },
        }
      }
      loadTableData(new_filter)
      setState(PENDING_DATA)
    }
  }, [state])

  //? DECIDE what data did you get
  useEffect(() => {
    setGridData(data)
    //? no matter what if the store has new data
    //? (aka the API call was made from outside the component
    //? render the new data)
    if (state === PENDING_DATA && tableData !== undefined) {
      if (tableData?.error) {
        setState(ERROR) //! request failed
        setState(RECEIVED_NO_DATA)
      } else if (!hasTableData() || !isArr(tableData.data)) {
        setState(RECEIVED_NO_RESPONSE) //got nothing
      } else if (!hasTableData() || isEmptyArr(tableData.data)) {
        setState(RECEIVED_NO_DATA) //? NO_DATA
      } else if (!isEmptyArr(tableData.data) && tableData.numberOfItems > 0) {
        setState(RECEIVED_DATA) //* GOT DATA
      }
    }
  }, [tableData?.data, tableData?.error])

  useEffect(() => {
    !stopRefreshOnPageSize && setState(GET_NEW_PAGE)
  }, [filter.page])

  useEffect(() => {
    !stopRefreshOnFilter && setState(GET_NEW_PAGE)
  }, [filter.options])
  useEffect(() => {
    !stopRefreshOnFilter && setState(GET_NEW_PAGE)
  }, [uniqueIdentifier])

  useEffect(() => {
    setLoading(store.isTableLoading)
  }, [store.isTableLoading])

  function hasTableData() {
    return tableData !== undefined && tableData !== null
  }

  //TODO make table body height transition smooth
  return (
    <div className={`table-container  ${className}`}>
      <TableHeader columns={columns || []} />
      <TableLoader isLoading={isLoading} />
      <TableBody
        tableRef={tableRef}
        columns={columns || []}
        data={gridData}
        maxHeight={maxHeight}
        itemHeight={itemHeight}
      />

      <TablePlaceholder state={state} />
      <TableFooter
        state={state}
        store={store}
        showPagination={showPagination}
        showPageSize={false}
      />
    </div>
  )
}
