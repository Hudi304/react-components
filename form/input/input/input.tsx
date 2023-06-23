import { useFormContext } from 'react-hook-form'
import { FC } from 'react'
import { ErrorMessage } from '../error-message'
import { Label } from '../label'

import '../input.scss'
import { SimpleInputProps } from '../types'

/** ### Styled UNCONTROLLED Input
 * #### Will display '$' for type="Currency" */
export const Input: FC<SimpleInputProps> = (props): JSX.Element => {
  const formContext = useFormContext()
  const { isDisabled = false, className = '', name, placeholder = '', id, field } = props
  const { formState } = formContext ?? {}
  const { errors } = formState ?? {}
  const disabled = isDisabled ? 'disabled' : ''
  const error = errors[name] ? 'error' : ''
  const componentId = id ?? name

  return (
    <div className='flex flex-col h-[62px]'>
      <Label {...props} />
      <input
        className={`base-input ${className} ${disabled} ${error}`}
        title={field.value}
        placeholder={placeholder}
        disabled={isDisabled}
        {...field}
        id={componentId}
      />
      <ErrorMessage name={name} />
    </div>
  )
}
