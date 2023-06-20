import React, { HTMLProps } from 'react'
import { Children, ClassName } from '@sub/types'

import './button.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'icon-btn'

export type ButtonType = 'small' | 'default' | 'large'

type CustomButtonProps = {
  variant?: ButtonVariant
  type?: ButtonType
}

type ButtonProps = HTMLProps<HTMLButtonElement> & CustomButtonProps & ClassName & Children

export const Button = React.memo(
  ({
    children,
    className = '',
    onClick = () => {
      console.log('Button onClick not implemented')
    },
    style = {},
    variant = 'primary',
    type = 'large',
    disabled = false,
    ...rest
  }: ButtonProps) => {
    return (
      <button
        className={`button ${className} ${type} ${variant} ${disabled ? 'disabled' : ''}`}
        style={style}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
