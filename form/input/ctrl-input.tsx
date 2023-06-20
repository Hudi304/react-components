import { FC } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { ControlledInputProps, Input } from './input'

export const ControlledInput: FC<ControlledInputProps> = (
  props,
): JSX.Element => {
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
