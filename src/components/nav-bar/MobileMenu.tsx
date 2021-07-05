import React, { FunctionComponent, useState } from 'react'

import Categories from '@components/common/Categories'
import RoundedButton from '@components/common/RoundedButton'

import MenuButtonMobile from '@components/nav-bar/MenuButtonMobile'
import MenuLink from '@components/nav-bar/MenuLink'
import SearchBar from '@components/nav-bar/SearchBar'

const MobileMenu: FunctionComponent = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className="flex flex-col py-8 nav-gutter-sm overflow-auto lg:hidden">
      <div className="mb-2">
        <MenuButtonMobile handleOpen={handleOpen} open={open}>
          Shop
        </MenuButtonMobile>
        {open && <Categories />}
        <MenuLink variant="mobile">About Us</MenuLink>
        <MenuLink variant="mobile">Visit Us</MenuLink>
        <MenuLink variant="mobile">FAQ</MenuLink>
      </div>
      <RoundedButton variant="full">Shop All Wines</RoundedButton>
      <SearchBar variant="mobile" />
    </div>
  )
}

export default MobileMenu
