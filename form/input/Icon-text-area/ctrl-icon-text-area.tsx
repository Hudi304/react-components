import { FC, useRef, useState } from 'react'
import { CtrlIconInputProps } from '../types'
import { Controlled } from '@sub/form/types'
import { Controller, useFormContext } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = CtrlIconInputProps & Controlled

/** ### Styled UNCONTROLLED IconTextArea */
const IconTextArea: FC<Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false)
  const text_area_ref = useRef<HTMLTextAreaElement | null>(null)

  const formContext = useFormContext()
  const { className = '', name, id, field, icon, label = '"' } = props
  const { formState } = formContext ?? {}
  const { errors } = formState ?? {}
  const error = errors[name] ? 'error' : ''
  const componentId = id ?? name
  const focus = isFocused ? 'outline-1' : 'outline-0'

  function onInputClick() {
    if (text_area_ref == null || text_area_ref.current == null) return

    text_area_ref.current.focus()
  }

  function onInputFocus() {
    setIsFocused(true)
  }

  function onInputBlur() {
    setIsFocused(false)
  }

  function ref(element: HTMLTextAreaElement | null) {
    field.ref(element)
    text_area_ref.current = element
  }

  return (
    <div>
      <div
        className={`${className} ${error} ${focus} outline-offset-0 outline outline-gray-9 flex flex-col debug rounded-md`}
        onClick={onInputClick}
      >
        <div className='flex items-center gap-3 p-4'>
          <FontAwesomeIcon className='icon text-2xl text-golden-rod w-[30px]' icon={icon} />
          <div>{label}</div>
        </div>
        <textarea
          {...field}
          ref={ref}
          id={componentId}
          className='w-full p-4 pt-0 h-full focus:outline-none rounded-md bg-transparent'
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
      </div>
      {/* <ErrorMessage name={name} /> */}
    </div>
  )
}

export const CtrlIconTextArea: FC<CtrlIconInputProps> = (props): JSX.Element => {
  const formContext = useFormContext()
  const { name } = props
  return (
    <Controller
      control={formContext.control}
      name={name}
      // rules={{ required: isRequired }}
      render={({ field }) => <IconTextArea {...props} field={field} />}
    />
  )
}
