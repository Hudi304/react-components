type LabelProps = {
  id: string
  isRequired: boolean
  label: string
}

export const Label = ({ id, isRequired, label = '' }: LabelProps): JSX.Element => {
  const renderedLabel = isRequired ? `${label} *` : label

  return (
    <label htmlFor={id} className='text-xs w-fit text-ellipsis whitespace-nowrap overflow-hidden h-4'>
      {renderedLabel}
    </label>
  )
}
