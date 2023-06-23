import { FC } from 'react'
import { Label } from '../label'

import { InputProps, UnCtrl } from '../types'

import './input.scss'

type Props = InputProps & UnCtrl

/** ### Styled UNCONTROLLED Input
 * #### Will display '$' for type="Currency" */
export const Input: FC<Props> = (props): JSX.Element => {
  const { isDisabled = false, className = '', placeholder = '' } = props
  const disabled = isDisabled ? 'disabled' : ''
  const height = props.label ? 'h-14' : 'h-10'

  return (
    <div className={`flex flex-col w-full ${height}`}>
      {props.label && <Label {...props} />}
      {/* prettier-ignore */}
      <input
        {...props}
        className={`base-input ${className} ${disabled}`}
        placeholder={placeholder}
        disabled={isDisabled}
      />
    </div>
  )
}
