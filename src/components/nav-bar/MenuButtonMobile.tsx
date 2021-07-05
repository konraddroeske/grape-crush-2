import React, { FunctionComponent } from 'react'

import MenuArrow from '../../assets/svgs/menu-arrow.svg'

interface MenuButtonProps {
  children: React.ReactNode
  handleOpen: () => void
  open: boolean
}

const MenuButtonMobile: FunctionComponent<MenuButtonProps> = ({
  children,
  handleOpen,
}) => {
  return (
    <button
      type="button"
      className="flex items-center text-4xl mr-0 mb-4 font-bold uppercase xl:mr-0"
      onClick={() => handleOpen()}
    >
      <div className="mr-2">{children}</div>
      <MenuArrow className="w-4" />
    </button>
  )
}

export default MenuButtonMobile
