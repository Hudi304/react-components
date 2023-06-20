import { useFormContext } from 'react-hook-form'

interface ErrorProps {
  name: string
}

export const ErrorMessage = ({ name }: ErrorProps): JSX.Element | null => {
  const { formState } = useFormContext()
  const { errors } = formState
  const error = errors[name] ?? {}

  return (
    <div className='text-xs text-left text-red-500 h-4'>
      {error.message?.toString()}
    </div>
  )
}
