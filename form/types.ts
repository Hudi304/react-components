import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export interface FormItem {
  name: string
  id?: string
}

export interface Controlled {
  field: ControllerRenderProps<FieldValues, string>
  // name: string
  // id?: string
}

/**
 * ### This might be overkill, feel free to change it*/
export enum UnitOfMeasure {
  kwh = 'kwh',
}

export enum Position {
  LEFT,
  RIGHT,
}
