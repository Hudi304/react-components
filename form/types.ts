import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export interface FormItem {
  name: string
  id?: string
}

export interface Controlled {
  field: ControllerRenderProps<FieldValues, string>
}

/**
 * ### This might be overkill, feel free to change it*/
export enum UnitOfMeasure {
  kwh = 'kwh',
}
