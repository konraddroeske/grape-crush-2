import React, { FunctionComponent, useEffect, useRef } from 'react'

import { gsap } from 'gsap'
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
      color: navOpen ? '#DFFF85' : nav,
    })

    gsap.to('.svg-desktop-arrow path', {
      duration,
      fill: navOpen ? '#DFFF85' : nav,
    })
  }, [navOpen, nav, duration])

  return (
    <button
      type="button"
      className="flex items-center h-12 text-xl mx-4 font-bold uppercase xl:mx-6"
      onClick={() => dispatch(setNavOpen(!navOpen))}
      onMouseEnter={() => {
        if (!navOpen) {
          dispatch(setNavOpen(true))
        }
      }}
    >
      <div ref={buttonRef} className="mr-2">
        {children}
      </div>
      <MenuArrow className="svg-desktop-arrow w-3" />
    </button>
  )
}

export default MenuButtonDesktop
