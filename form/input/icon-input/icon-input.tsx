import { ClassName } from '@sub/types'
import { FC, ReactNode, useRef, useState } from 'react'
import { FormItem, Position } from '../../types'
import { Icon } from '@cmp/icon/icon'

import './icon-input.scss'

type IconInputProps = {
  position?: Position
  icon?: React.ForwardRefExoticComponent<Pick<React.SVGProps<SVGSVGElement>, any>>
  value?: string
  name?: string
  label?: string
} & ClassName &
  FormItem

export const IconInput: FC<IconInputProps> = (props: IconInputProps) => {
  const [state, setState] = useState<Position | undefined>()
  const { icon, position, value, name, label, className = '' } = props

  const ref = useRef<HTMLInputElement | null>(null)

  function onInputClick() {
    if (ref == null) {
      return
    }

    if (ref.current == null) {
      return
    }

    ref.current.focus()
  }

  return (
    <div className={`icon-input-container ${className}`} onClick={onInputClick}>
      {position == Position.LEFT && <Icon className='icon' icon={icon} size={6} />}

      {label ? (
        <div className='input-container '>
          <div className='label'>{label}</div>
          <input ref={ref} value={value} className='input' />
        </div>
      ) : (
        <input ref={ref} value={value} className='unlabeled-input' />
      )}

      {position == Position.RIGHT && <Icon className='icon ml-auto' icon={icon} size={6} />}
    </div>
  )
}
