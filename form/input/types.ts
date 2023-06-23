import { Position } from './../types'
import { ClassName } from '@sub/types'
import { FormItem } from '../types'

type IconCmp = React.ForwardRefExoticComponent<Pick<React.SVGProps<SVGSVGElement>, any>>

export type UnCtrl = {
  onChange: (e: any) => void
  value: any
}

export type InputProps = {
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
  label?: string
} & ClassName

export type CtrlInputProps = InputProps & FormItem

export type IconInputProps = {
  position?: Position
  icon?: IconCmp
  value?: string
  name?: string
  label?: string
  readonly?: boolean
} & ClassName

export type CtrlIconInputProps = IconInputProps & FormItem
