import React, { FunctionComponent, useState } from 'react'

import DesktopCategories from '@components/nav-bar/DesktopCategories'
import MenuButtonDesktop from '@components/nav-bar/MenuButtonDesktop'
import MenuLink from '@components/nav-bar/MenuLink'

const DesktopMenu: FunctionComponent = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = (bool: boolean) => {
    setOpen(bool)
  }

  return (
    <div className="hidden ml-auto mr-8 lg:flex">
      <div
        className="flex items-center"
        // onMouseEnter={() => setOpen(true)}
        // onMouseLeave={() => setOpen(false)}
        // onClick={() => setOpen(true)}
      >
        <MenuButtonDesktop
          handleOpen={handleOpen}
          open={open}
          variant="desktop"
        >
          Shop
        </MenuButtonDesktop>
        {open && <DesktopCategories />}
      </div>
      <MenuLink variant="desktop">About Us</MenuLink>
      <MenuLink variant="desktop">Visit Us</MenuLink>
      <MenuLink variant="desktop">FAQ</MenuLink>
    </div>
  )
}

export default DesktopMenu
