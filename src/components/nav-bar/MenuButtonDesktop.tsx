import React, { FunctionComponent } from 'react'

import MenuArrow from '../../assets/svgs/menu-arrow.svg'

interface MenuButtonProps {
  children: React.ReactNode
  handleOpen: (bool: boolean) => void
  open: boolean
  variant: 'mobile' | 'desktop'
}

const MenuButtonDesktop: FunctionComponent<MenuButtonProps> = ({
  children,
  open,
  handleOpen,
}) => {
  return (
    <button
      type="button"
      className="flex items-center h-12 text-xl mx-4 font-bold uppercase xl:mx-6"
      onClick={() => handleOpen(!open)}
      // onFocus={() => handleOpen(true)}
      // onBlur={() => handleOpen(false)}
    >
      <div className="mr-2">{children}</div>
      <MenuArrow className="w-3" />
    </button>
  )
}

export default MenuButtonDesktop
