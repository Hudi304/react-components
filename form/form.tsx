import { FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { ClassName } from '@sub/types'
import { CtrlInput } from './input/input/ctrl-input'
import { CtrlIconInput } from './input/icon-input/ctrl-icon-input'

type FormProps = {
  children: any
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>
  methods: UseFormReturn<any, any> // the second generic type is not exported by the lib
} & ClassName

const FormCmp: FC<FormProps> = ({ children, methods, className = '', onSubmit }): JSX.Element => (
  <FormProvider {...methods}>
    <form className={`${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  </FormProvider>
)

export const Form = Object.assign(FormCmp, {
  Input: CtrlInput,
  IconInput: CtrlIconInput,

  // Select: ControlledSelect,
  // Checkbox: ControlledCheckbox,
  // LockInput: ControlledLockInput,
})
