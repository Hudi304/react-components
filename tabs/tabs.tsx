import { Button } from '@sub/button/button'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type Tab = {
  path: string
  element: any
  label: string
}

export type RouteTabsProps = {
  tabs: Tab[]
}


export const RouteTabs: FC<RouteTabsProps> = ({ tabs }: RouteTabsProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className='w-full flex mt-9 mb-[18px] gap-1'>
      {tabs.map((tab, index) => {
        const isSelected = pathname.includes(tab.path)
        const variant = isSelected ? 'tertiary' : 'tab'

        return (
          <Button
            key={`${tab.label}-${index}`}
            className='px-2 py-1'
            type='default'
            variant={variant}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </Button>
        )
      })}
    </div>
  )
}
