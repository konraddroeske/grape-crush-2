import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

import MenuArrow from '../../assets/svgs/menu-arrow.svg'

interface MenuButtonProps {
  children: React.ReactNode
  handleOpen: () => void
  open: boolean
}

const MenuButtonMobile: FunctionComponent<MenuButtonProps> = ({
  children,
  handleOpen,
}) => {
  const { navOpen } = useSelector(selectGlobal())
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    gsap.to(buttonRef.current, {
      duration,
      color: navOpen ? '#FFFFFF' : nav,
    })

    gsap.to('.svg-mobile-arrow path', {
      duration,
      fill: navOpen ? '#FFFFFF' : nav,
    })
  }, [nav, navOpen, duration])

  return (
    <button
      ref={buttonRef}
      type="button"
      className="flex items-center text-4xl mr-0 mb-4 font-bold uppercase xl:mr-0"
      onClick={() => handleOpen()}
    >
      <div className="mr-2">{children}</div>
      <MenuArrow className="w-3 svg-mobile-arrow" style={{}} />
    </button>
  )
}

export default MenuButtonMobile
