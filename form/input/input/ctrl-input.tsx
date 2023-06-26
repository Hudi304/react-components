import { FC } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { CtrlInputProps } from '../types'
import { ErrorMessage } from '../error-message'
import { Label } from '../label'
import { Controlled } from '@sub/form/types'

// import './input.scss'

type Props = CtrlInputProps & Controlled

const Input: FC<Props> = (props): JSX.Element => {
  const formContext = useFormContext()
  const { isDisabled = false, className = '', name, placeholder = '', id, field } = props
  const { formState } = formContext ?? {}
  const { errors } = formState ?? {}
  const disabled = isDisabled ? 'disabled' : ''
  const error = errors[name] ? 'error' : ''
  const componentId = id ?? name

  return (
    <div className='flex flex-col h-[62px]'>
      {/* <Label {...props} /> */}
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

export const CtrlInput: FC<CtrlInputProps> = (props): JSX.Element => {
  const formContext = useFormContext()
  const { name, isRequired } = props
  return (
    <Controller
      control={formContext.control}
      name={name}
      rules={{ required: isRequired }}
      render={({ field }) => <Input {...props} field={field} />}
    />
  )
}
