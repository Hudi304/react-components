import { ClassName } from '@sub/types'
import { FC, useState } from 'react'
import { FormItem, Position } from '../types'
import { Icon } from '@cmp/icon/icon'
import { ICONS } from '@cmp/icon/icons-constant'

type IconInputProps = {
  position?: Position
  icon?: any
} & ClassName &
  FormItem

export const IconInput: FC<IconInputProps> = ({ icon, position }: IconInputProps) => {
  const [state, setState] = useState<Position | undefined>()

  return (
    <div className='debug flex items-center p-2 gap-2'>
      {position == Position.LEFT && <Icon icon={ICONS.BELL} size={5} />}
      <input className='debug w-full' />
      {position == Position.RIGHT && <Icon icon={ICONS.BELL} size={5} />}
    </div>
  )
}
