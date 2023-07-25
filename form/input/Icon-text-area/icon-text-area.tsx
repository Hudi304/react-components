import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Position } from '@sub/form/types'
import { ChangeEvent, FC, useRef, useState } from 'react'

type IconTextAreaProps = {
  className?: string
  position?: Position
  icon?: any
  value?: string
  name?: string
  label?: string
  readonly?: boolean
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

/** ### Styled UNCONTROLLED IconTextArea */
export const IconTextArea: FC<IconTextAreaProps> = ({ className = '', icon, onChange }) => {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  const [isFocused, setIsFocused] = useState(false)

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

  const focus = isFocused ? 'outline-1' : 'outline-0'

  return (
    <div
      className={`${className} ${focus} outline-offset-0 outline outline-gray-9 flex flex-col debug rounded-md`}
      onClick={onInputClick}
    >
      <div className='flex items-center gap-3 p-4'>
        <FontAwesomeIcon className='icon text-2xl text-golden-rod w-[30px]' icon={icon} />
        <div>Review Text</div>
      </div>
      <textarea
        ref={ref}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onChange}
        className='w-full p-4 pt-0 h-full focus:outline-none rounded-md'
      />
    </div>
  )
}
