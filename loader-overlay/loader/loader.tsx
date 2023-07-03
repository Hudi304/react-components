import { FC } from 'react'
import React from 'react'

import './loader.scss'

type Props = {
  className?: string
  size?: number
  loaderClass?: string
}

export const Loader: FC<Props> = ({ className = '', size = 10, loaderClass = '' }: Props) => {
  const loaderStyle = {
    width: `${size * 4}px`,
    height: `${size * 4}px`,
  }

  return (
    <div className={`loader text-green_accent ${className}`} style={loaderStyle}>
      <LoaderSvg className={loaderClass} />
    </div>
  )
}

type SvgProps = {
  className?: string
  style?: any
  onClick?: any
  width?: string
  height?: string
  disabled?: boolean
  size?: number
  color?: string
}

const LoaderSvg = React.memo(({ className }: SvgProps) => (
  <svg
    className={`loading text-gold ${className}`}
    width='100%'
    height='100%'
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
  >
    <circle
      cx='50'
      cy='50'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth='10'
      r='35'
      strokeDasharray='164.93361431346415 56.97787143782138'
      transform='rotate(354.844 50 50)'
    >
      <animateTransform
        attributeName='transform'
        type='rotate'
        repeatCount='indefinite'
        dur='1s'
        values='0 50 50;360 50 50'
        keyTimes='0;1'
      />
    </circle>
  </svg>
))
