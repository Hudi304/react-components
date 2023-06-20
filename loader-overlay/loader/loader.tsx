import { FC } from 'react'
import './loader.scss'

type Props = {
  className?: string
  size?: number
  loaderClass?: string
}

export const Loader: FC<Props> = ({
  className = '',
  size = 10,
  loaderClass = '',
}: Props) => {
  const loaderStyle = {
    width: `${size * 4}px`,
    height: `${size * 4}px`,
  }

  return (
    <div
      className={`loader text-green_accent ${className}`}
      style={loaderStyle}
    >
      {/* <LoaderSvg className={loaderClass} /> */}
    </div>
  )
}
