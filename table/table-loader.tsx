import { Loader } from '../loader-overlay/loader/loader'

type TableLoaderProps = {
  isLoading: boolean
}
export function TableLoader({ isLoading }: TableLoaderProps) {
  if (isLoading) {
    return (
      <div className='c1-r2 h-full min-h-20 flex justify-center items-center bg-white opacity-50'>
        <Loader size={15} />
      </div>
    )
  }
  return null
}
