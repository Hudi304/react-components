import { useState, useEffect } from 'react'
import { TableStore } from '../table/table'
import { PageButtons } from './footer-buttons/footer-buttons'

type TablePaginationProps<M, F> = {
  store: TableStore<M, F>
}

export function TablePagination<M, F>({ store }: TablePaginationProps<M, F>) {
  const [numberOfPages, setNumberOfPages] = useState<number>(0)
  const { tableFilter: filter, setFilter, tableData } = store
  // const page = {
  //   pageNumber: (store.tableFilter.page.pageNumber as number) + 1,
  //   pageSize: store.tableFilter.page.pageSize as number,
  // }

  const page = {
    pageNumber: 0,
    pageSize: 0,
  }
  const r_no_of_items = tableData?.numberOfItems

  useEffect(() => {
    const lastPage = getLastPage(r_no_of_items, page.pageSize)
    setNumberOfPages(lastPage)
  }, [])

  useEffect(() => {
    const lastPage = getLastPage(r_no_of_items, page.pageSize)
    setNumberOfPages(lastPage)
  }, [r_no_of_items, filter.page.pageSize])

  const setPageNo = (pageNo: number) => {
    if (pageNo > 0 && pageNo <= numberOfPages) {
      setFilter({
        ...filter,
        page: {
          ...filter.page,
          pageNumber: pageNo - 1,
        },
      })
    }
  }

  function getLastPage(
    numberOfItems: number | undefined,
    pageSize: number,
  ): number {
    const noOfPages = Math.floor((numberOfItems as number) / pageSize)
    if ((numberOfItems as number) % pageSize !== 0) {
      return noOfPages + 1
    }
    return noOfPages
  }

  const onLast = () => {
    if (page.pageNumber < numberOfPages) {
      setPageNo(numberOfPages)
    }
  }

  const onNext = () => {
    if (page.pageNumber < numberOfPages) {
      setPageNo(page.pageNumber + 1)
    }
  }

  const onPrevious = () => {
    if (page.pageNumber > 1) {
      setPageNo(page.pageNumber - 1)
    }
  }

  const onFirst = () => {
    if (page.pageNumber > 1) {
      setPageNo(1)
    }
  }

  // function isSelected(index: number) {
  //   return index === page.pageNumber
  //     ? 'shadow-md bg-gray-100 rounded-md cursor-default'
  //     : ''
  // }

  function onPageClick(e: any, index: number) {
    if (index !== page.pageNumber) {
      e.preventDefault()
      setPageNo(index)
    }
  }

  function isDisabled(dir: string) {
    if (dir === 'left' && page.pageNumber === 1) {
      return 'h-8 cursor-not-allowed opacity-50'
    }
    if (dir === 'right' && page.pageNumber === numberOfPages) {
      return 'h-8 cursor-not-allowed opacity-50'
    }
    return 'h-8 cursor-pointer'
  }

  return (
    <span className='flex items-center justify-center gap-4 c1-r1'>
      {/* <DoubleForwardArrow
        className={`rotate-180 ${isDisabled('left')}`}
        onClick={onFirst}
      />
      <ForwardArrow
        className={`rotate-180 ${isDisabled('left')}`}
        onClick={onPrevious}
      /> */}

      <PageButtons
        numberOfPages={numberOfPages}
        onPageClick={onPageClick}
        selectedPage={page.pageNumber}
      />
      {/* 
      <ForwardArrow className={`${isDisabled('right')}`} onClick={onNext} />
      <DoubleForwardArrow
        className={`${isDisabled('right')}`}
        onClick={onLast}
      /> */}
    </span>
  )
}
