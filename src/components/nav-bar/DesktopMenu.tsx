import React, { FunctionComponent } from 'react'

import { useDispatch } from 'react-redux'

import DesktopCategories from '@components/nav-bar/DesktopCategories'
import MenuButtonDesktop from '@components/nav-bar/MenuButtonDesktop'
import MenuLink from '@components/nav-bar/MenuLink'
import { setNavOpen } from '@redux/globalSlice'

const DesktopMenu: FunctionComponent = () => {
  // const { navOpen } = useSelector(selectGlobal())
  const dispatch = useDispatch()

  return (
    <div className="hidden ml-auto mr-6 lg:flex">
      <div
        className="flex items-center"
        onMouseLeave={() => dispatch(setNavOpen(false))}
      >
        <MenuButtonDesktop>Shop</MenuButtonDesktop>
        <DesktopCategories />
      </div>
      <MenuLink variant="desktop" to="/about">
        About Us
      </MenuLink>
      <MenuLink variant="desktop" to="/faq">
        Visit Us
      </MenuLink>
      <MenuLink variant="desktop" to="/faq">
        FAQ
      </MenuLink>
    </div>
  )
}

export default DesktopMenu
