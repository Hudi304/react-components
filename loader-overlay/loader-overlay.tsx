import { useEffect, useState } from 'react'
import { Loader } from './loader/loader'

import './loader-overlay.scss'

type LoaderOverlayProps = {
  isLoading: boolean
  children: any
  displayChildren?: boolean
  loaderSize?: number
  className?: string
  loaderClass?: string
}

export const LoaderOverlay = ({
  children,
  isLoading,
  displayChildren = true,
  loaderSize = 20,
  className = '',
  loaderClass = '',
}: LoaderOverlayProps) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <div className={`loader-container g-c1-r1 ${className} `}>
      {(displayChildren || !loading) && <div className='loader-children c1-r1'>{children}</div>}
      {loading && (
        <div className={`loader-overlay c1-r1 z-10`}>
          <Loader loaderClass={loaderClass} size={loaderSize} className='w-full' />
        </div>
      )}
    </div>
  )
}
