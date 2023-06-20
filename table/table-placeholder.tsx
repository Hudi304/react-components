import { TableState } from './table'

type TablePlaceholderProps = {
  state: TableState
}
export function TablePlaceholder({ state }: TablePlaceholderProps) {
  if (state === TableState.RECEIVED_NO_DATA) {
    return (
      <div className='flex items-center justify-center mt-5 text-caption-l-bold'>
        No data
      </div>
    )
  }
  return null
}
