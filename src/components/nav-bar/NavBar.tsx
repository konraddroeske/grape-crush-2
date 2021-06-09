import React, { FunctionComponent } from 'react'

import Logo from '@components/common/Logo'
import Cart from '@components/nav-bar/Cart'
import Hamburger from '@components/nav-bar/Hamburger'

const NavBar: FunctionComponent = () => {
  return (
    <div className="fixed z-10 top-0 left-0 right-0 py-4 flex justify-between items-center gutter-s">
      <Hamburger />
      <Logo />
      <Cart />
    </div>
  )
}

export default NavBar
