import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useDispatch, useSelector } from 'react-redux'

import { selectGlobal, setNavOpen } from '@redux/globalSlice'

import { selectHero } from '@redux/heroSlice'

import MenuArrow from '../../assets/svgs/menu-arrow.svg'

interface MenuButtonProps {
  children: React.ReactNode
  // variant: 'mobile' | 'desktop'
}

const MenuButtonDesktop: FunctionComponent<MenuButtonProps> = ({
  children,
}) => {
  const dispatch = useDispatch()
  const { navOpen } = useSelector(selectGlobal())
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme
  const buttonRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(buttonRef.current, {
      duration,
      color: navOpen ? '#414042' : nav,
    })

    gsap.to('.svg-desktop-button path', {
      duration,
      fill: navOpen ? '#414042' : nav,
    })
  }, [navOpen, nav, duration])

  return (
    <button
      type="button"
      className="flex items-center h-12 text-xl mx-4 font-bold uppercase xl:mx-6"
      onClick={() => dispatch(setNavOpen(!navOpen))}
      // onFocus={() => handleOpen(true)}
      // onBlur={() => handleOpen(false)}
    >
      <div ref={buttonRef} className="mr-2">
        {children}
      </div>
      <MenuArrow className="svg-desktop-button w-3" />
    </button>
  )
}

export default MenuButtonDesktop
