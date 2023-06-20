import { useEffect, useState } from 'react'
import { Loader } from './loader/loader'
import './loader-overlay.scss'

type LoaderOverlayProps = {
  isLoading: boolean
  children: any
  overlayOpacity?: number
  displayChildren?: boolean
  loaderSize?: number
  className?: string
  loaderClass?: string
}

export const LoaderOverlay = ({
  children,
  isLoading,
  overlayOpacity,
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
    <div className={`loader-container ${className} `}>
      {(displayChildren || !loading) && (
        <div className='loader-children c1-r1'>{children}</div>
      )}
      {loading && (
        <div
          className={`loader-overlay c1-r1`}
          style={{ backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})` }}
        >
          <Loader
            loaderClass={loaderClass}
            size={loaderSize}
            className='w-full'
          />
        </div>
      )}
    </div>
  )
}
