import React, { FunctionComponent, useEffect, useRef } from 'react'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'

import { useDispatch, useSelector } from 'react-redux'

import { useMediaQuery } from 'react-responsive'

import Logo from '@components/common/Logo'
import Cart from '@components/nav-bar/Cart'
import DesktopMenu from '@components/nav-bar/DesktopMenu'
import Hamburger from '@components/nav-bar/Hamburger'
import MobileMenu from '@components/nav-bar/MobileMenu'
import { selectGlobal, setNavOpen } from '@redux/globalSlice'

const NavBar: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { navOpen } = useSelector(selectGlobal())
  const navRef = useRef<null | HTMLElement>(null)

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  useEffect(() => {
    gsap.set(navRef.current, {
      backgroundColor: navOpen && !isDesktop ? 'white' : 'transparent',
      bottom: navOpen && !isDesktop ? 0 : 'auto',
    })

    if (navOpen && !isDesktop && navRef.current) {
      disableBodyScroll(navRef.current)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [navOpen, isDesktop])

  useEffect(() => {
    if (navOpen && !isDesktop) {
      dispatch(setNavOpen(true))
    }
  }, [navOpen, dispatch, isDesktop])

  return (
    <nav
      ref={navRef}
      className="fixed z-30 top-0 left-0 right-0 nav-gutter-sm overflow-y-auto
      lg:nav-gutter-lg xl:nav-gutter-xl"
    >
      <div className="relative flex h-16 justify-between items-center">
        <Hamburger />
        <Logo />
        <DesktopMenu isDesktop={isDesktop} />
        <Cart />
      </div>
      {navOpen && !isDesktop && <MobileMenu />}
    </nav>
  )
}

export default NavBar
