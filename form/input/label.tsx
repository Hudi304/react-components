import { ControlledInputProps } from './input'

export const Label = ({
  id,
  isRequired,
  label = '',
}: ControlledInputProps): JSX.Element => {
  const renderedLabel = isRequired ? `${label} *` : label

  return (
    <label
      htmlFor={id}
      className='text-xs w-fit text-ellipsis whitespace-nowrap overflow-hidden h-4'
    >
      {renderedLabel}
    </label>
  )
}
