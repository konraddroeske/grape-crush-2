import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'

import { useSelector } from 'react-redux'

import Logo from '@components/common/Logo'
import Cart from '@components/nav-bar/Cart'
import Hamburger from '@components/nav-bar/Hamburger'
import Menu from '@components/nav-bar/Menu'
import { selectGlobal } from '@redux/globalSlice'

const NavBar: FunctionComponent = () => {
  const { navOpen } = useSelector(selectGlobal())
  const navRef = useRef<null | HTMLElement>(null)

  useEffect(() => {
    gsap.set(navRef.current, {
      backgroundColor: navOpen ? 'white' : 'transparent',
      bottom: navOpen ? 0 : 'auto',
    })
  }, [navOpen])

  return (
    <nav
      ref={navRef}
      className="fixed z-10 top-0 left-0 right-0 py-4 nav-gutter-sm overflow-y-auto"
    >
      <div className="relative flex justify-between items-center">
        <Hamburger />
        <Logo />
        <Cart />
      </div>
      {navOpen && <Menu />}
    </nav>
  )
}

export default NavBar
