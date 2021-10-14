import React, { FunctionComponent, useEffect, useRef } from 'react'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

import { useDispatch, useSelector } from 'react-redux'

import { useMediaQuery } from 'react-responsive'

import Logo from '@components/common/Logo'
import MobileSpinner from '@components/landing-page/hero/MobileSpinner'
import Cart from '@components/nav-bar/Cart'
import DesktopMenu from '@components/nav-bar/DesktopMenu'
import DesktopSearch from '@components/nav-bar/DesktopSearch'
import Hamburger from '@components/nav-bar/Hamburger'
import MobileMenu from '@components/nav-bar/MobileMenu'
import { selectGlobal, setNavOpen } from '@redux/globalSlice'

const NavBar: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { navOpen } = useSelector(selectGlobal())
  const navRef = useRef<null | HTMLElement>(null)

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const mobileNavOpen = navOpen && !isDesktop

  useEffect(() => {
    // gsap.set(navRef.current, {
    //   backgroundColor: mobileNavOpen ? '#2C148E' : 'transparent',
    //   bottom: mobileNavOpen ? 0 : 'auto',
    //   overflowX: mobileNavOpen ? 'hidden' : 'auto',
    // }

    if (mobileNavOpen && navRef.current) {
      disableBodyScroll(navRef.current)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [mobileNavOpen])

  useEffect(() => {
    if (navOpen && !isDesktop) {
      dispatch(setNavOpen(true))
    }
  }, [navOpen, dispatch, isDesktop])

  return (
    <nav
      ref={navRef}
      className="fixed z-30 top-0 left-0 right-0 body-gutter-sm overflow-y-auto
      lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl"
      onMouseLeave={() => {
        if (isDesktop) {
          dispatch(setNavOpen(false))
        }
      }}
    >
      <div className="relative z-10 flex h-16 justify-between items-center">
        <Hamburger />
        <MobileSpinner />
        <Logo />
        <DesktopMenu />
        <div className="flex">
          <DesktopSearch />
          <Cart />
        </div>
      </div>
      {/* {mobileNavOpen && <MobileMenu />} */}
      <MobileMenu mobileNavOpen={mobileNavOpen} />
    </nav>
  )
}

export default NavBar
