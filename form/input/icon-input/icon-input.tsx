import { ClassName } from '@sub/types'
import { FC, useState } from 'react'
import { FormItem, Position } from '../../types'
import { Icon } from '@cmp/icon/icon'
import { ICONS } from '@cmp/icon/icons-constant'

import './icon-input.scss'

type IconInputProps = {
  position?: Position
  icon?: any
  value?: string
  name?: string
  label?: string
} & ClassName &
  FormItem

export const IconInput: FC<IconInputProps> = (props: IconInputProps) => {
  const [state, setState] = useState<Position | undefined>()

  const { icon, position, value, name, label } = props

  return (
    <div className='debug flex items-center p-2 gap-2 h-[60px] rounded-md'>
      {position == Position.LEFT && <Icon className='text-golden-rod' icon={ICONS.MAGNIFYING_GLASS} size={6} />}
      <Input {...props} />

      {position == Position.RIGHT && <Icon className='text-golden-rod' icon={ICONS.MAGNIFYING_GLASS} size={6} />}
    </div>
  )
}

const Input: FC<IconInputProps> = ({ label, value }) => {
  if (label) {
    return (
      <div className='input-container '>
        <div className='label '>{label}</div>
        <input value={value} className='input ' />
      </div>
    )
  }

  return <input value={value} className='input ' />
}
