import React, { FunctionComponent } from 'react'

import MenuButtonDesktop from '@components/nav-bar/MenuButtonDesktop'
import MenuLink from '@components/nav-bar/MenuLink'

const DesktopMenu: FunctionComponent = () => {
  // const dispatch = useDispatch()

  return (
    <div className="hidden ml-auto mr-8 2xl:mr-16 lg:flex items-center">
      <div className="flex items-center">
        <MenuButtonDesktop>Shop</MenuButtonDesktop>
        {/* <DesktopCategories /> */}
      </div>
      <MenuLink variant="desktop" to="/about">
        About Us
      </MenuLink>
      <MenuLink variant="desktop" to="/contact">
        Visit Us
      </MenuLink>
      <MenuLink variant="desktop" to="/faq">
        FAQ
      </MenuLink>
    </div>
  )
}

export default DesktopMenu
