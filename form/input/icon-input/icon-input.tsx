import { FC, useRef, useState } from 'react'
import { Position } from '../../types'
import { Icon } from '@cmp/icon/icon'

import './icon-input.scss'
import { IconInputProps } from '../types'

/** ### Styled UNCONTROLLED IconInput */
export const IconInput: FC<IconInputProps> = (props: IconInputProps) => {
  const { icon, position, value, name, label, className = '' } = props

  const [isFocused, setIsFocused] = useState(false)

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

  function onInputFocus() {
    setIsFocused(true)
  }

  function onInputBlur() {
    setIsFocused(false)
  }

  const focus = isFocused ? 'border-2' : ''

  return (
    <div className={`icon-input-container ${focus} ${className}`} onClick={onInputClick}>
      {position == Position.LEFT && <Icon className='icon' icon={icon} size={6} />}

      {label ? (
        <div className='input-container '>
          <div className='label'>{label}</div>
          <input
            ref={ref}
            value={value}
            className='input'
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            readOnly={props.readonly}
          />
        </div>
      ) : (
        <input
          ref={ref}
          value={value}
          className='unlabeled-input'
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          readOnly={props.readonly}
        />
      )}

      {position == Position.RIGHT && <Icon className='icon ml-auto' icon={icon} size={6} />}
    </div>
  )
}
