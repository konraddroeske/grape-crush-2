import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import DesktopCategories from '@components/nav-bar/DesktopCategories'
import MenuButtonDesktop from '@components/nav-bar/MenuButtonDesktop'
import MenuLink from '@components/nav-bar/MenuLink'
import { selectGlobal } from '@redux/globalSlice'

interface Props {
  isDesktop: boolean
}

const DesktopMenu: FunctionComponent<Props> = ({ isDesktop }) => {
  const { navOpen } = useSelector(selectGlobal())

  return (
    <div className="hidden ml-auto mr-8 lg:flex">
      <div
        className="flex items-center"
        // onMouseEnter={() => setOpen(true)}
        // onMouseLeave={() => setOpen(false)}
        // onClick={() => setOpen(true)}
      >
        <MenuButtonDesktop>Shop</MenuButtonDesktop>
        {navOpen && isDesktop && <DesktopCategories />}
      </div>
      <MenuLink variant="desktop">About Us</MenuLink>
      <MenuLink variant="desktop">Visit Us</MenuLink>
      <MenuLink variant="desktop">FAQ</MenuLink>
    </div>
  )
}

export default DesktopMenu
