import { FC, useRef, useState } from 'react'
import { CtrlIconInputProps } from '../types'
import { Controller, useFormContext } from 'react-hook-form'
import { Icon } from '@cmp/icon/icon'
import { Controlled, Position } from '@sub/form/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type IconInputProps = CtrlIconInputProps & Controlled

/** ### Styled UNCONTROLLED IconInput */
const IconInput: FC<IconInputProps> = (props) => {
  const { icon, position, value, name, label, className = '', id, field } = props

  const [isFocused, setIsFocused] = useState(false)

  const ref = useRef<HTMLInputElement | null>(null)

  function onInputClick() {
    if (ref == null || ref.current == null) {
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

  const componentId = id ?? name

  return (
    <div className={`icon-input-container ${focus} ${className}`} onClick={onInputClick}>
      {/* {position == Position.LEFT && <Icon className='icon' icon={icon} size={6} />} */}
      {position == Position.LEFT && <FontAwesomeIcon className='icon ml-auto text-2xl' icon={icon} />}

      {label ? (
        <div className='input-container '>
          <div className='label'>{label}</div>
          <input
            {...field}
            id={componentId}
            // ref={ref}
            // value={value}
            className='input'
            // onFocus={onInputFocus}
            // onBlur={onInputBlur}
          />
        </div>
      ) : (
        <input
          {...field}
          id={componentId}
          // ref={ref}
          // value={value}
          className='unlabeled-input'
          // onFocus={onInputFocus}
          // onBlur={onInputBlur}
        />
      )}
      {position == Position.RIGHT && <FontAwesomeIcon className='icon ml-auto text-2xl' icon={icon} />}

      {/* {position == Position.RIGHT && <Icon className='icon ml-auto' icon={icon} size={6} />} */}
    </div>
  )
}

export const CtrlIconInput: FC<CtrlIconInputProps> = (props) => {
  const formContext = useFormContext()
  const { name } = props
  return (
    <Controller
      control={formContext.control}
      name={name}
      // rules={{ required: isRequired }}
      render={({ field }) => <IconInput {...props} field={field} />}
    />
  )
}
