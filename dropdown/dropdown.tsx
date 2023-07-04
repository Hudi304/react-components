import { Children, ClassName } from '@sub/types'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FC, Fragment, ReactNode } from 'react'

import './dropdown.scss'

type DropdownTriggerProps = {
  children: ReactNode
}

export const DropdownTrigger: FC<DropdownTriggerProps> = ({ children }) => {
  return (
    <Menu.Button
      as='div'
      className='border-2 border-black rounded-full w-full px-5 h-10 flex justify-between items-center'
    >
      <div>{children}</div>

      <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5 text-black hover:text-violet-100' aria-hidden='true' />
    </Menu.Button>
  )
}

type DropdownBodyProps = {
  children: any
}
export const DropdownBody: FC<DropdownBodyProps> = ({ children }) => {
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <Menu.Items className='dropdown-body'>{children}</Menu.Items>
    </Transition>
  )
}

type DropdownItemProps = {
  children: ReactNode
  onClick?: (value: any) => void
} & ClassName

export const DropdownItem: FC<DropdownItemProps> = ({ children, className = '', onClick }: DropdownItemProps) => {
  return (
    <Menu.Item>
      {({ active, disabled }) => {
        const isActive = active ? 'bg-violet-500 text-white' : 'text-gray-900'
        return (
          <button
            onClick={onClick}
            className={`${isActive} ${className} flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {children}
          </button>
        )
      }}
    </Menu.Item>
  )
}

interface DropdownProps {}

// TODO finish this
export const Dropdown: FC<DropdownProps> = ({}: DropdownProps) => {
  return (
    <div className='relative w-full px-5'>
      <Menu>
        <DropdownTrigger>Pick One</DropdownTrigger>
        <DropdownBody>
          <DropdownItem>one</DropdownItem>
        </DropdownBody>
      </Menu>
    </div>
  )
}
