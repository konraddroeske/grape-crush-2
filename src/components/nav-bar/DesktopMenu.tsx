import React, { FunctionComponent } from 'react'

import MenuButtonDesktop from '@components/nav-bar/MenuButtonDesktop'
import MenuLink from '@components/nav-bar/MenuLink'
import NavLinkDesktop from '@components/nav-bar/NavLinkDesktop'

const DesktopMenu: FunctionComponent = () => {
  return (
    <div className="hidden ml-auto mr-8 2xl:mr-16 lg:flex items-center">
      <div className="flex items-center">
        <MenuButtonDesktop>Shop</MenuButtonDesktop>
      </div>
      <MenuLink variant="desktop" to="/about">
        About
      </MenuLink>
      <MenuLink variant="desktop" to="/contact">
        Visit Us
      </MenuLink>
      <MenuLink variant="desktop" to="/faq">
        FAQ
      </MenuLink>
      <a
        href="https://www.tbdine.com/book/restaurant/grape-crush?idApp=69879&language=en-us"
        target=" _blank"
        rel=" noopener noreferrer"
      >
        <NavLinkDesktop>Reservations</NavLinkDesktop>
      </a>
    </div>
  )
}

export default DesktopMenu
