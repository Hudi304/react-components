import { FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { ClassName } from '@sub/types'
import { ControlledInput } from './input/ctrl-input'

type FormProps = {
  children: any
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>
  methods: UseFormReturn<any, any> // the second generic type is not exported by the lib
} & ClassName

const Form: FC<FormProps> = ({
  children,
  methods,
  className = '',
  onSubmit,
}): JSX.Element => (
  <FormProvider {...methods}>
    <form className={`${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  </FormProvider>
)

export default Object.assign(Form, {
  Input: ControlledInput,
  // Select: ControlledSelect,
  // Checkbox: ControlledCheckbox,
  // LockInput: ControlledLockInput,
})
