import { Position } from './../types'
import { ClassName } from '@sub/types'
import { Controlled, FormItem } from '../types'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

type IconCmp = React.ForwardRefExoticComponent<Pick<React.SVGProps<SVGSVGElement>, any>>

export type ControlledInputProps = {
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
  label?: string
} & ClassName &
  FormItem &
  Controlled

export type IconInputProps = {
  position?: Position
  icon?: IconCmp
  value?: string
  name?: string
  label?: string
  readonly?: boolean
} & ClassName

export type CtrlIconInputProps = IconInputProps & FormItem

export type SimpleInputProps = ControlledInputProps & {
  field: ControllerRenderProps<FieldValues, string>
}

// export type CtrlIconInputProps = {
//   isRequired?: boolean
// } & FormItem &
//   Controlled
