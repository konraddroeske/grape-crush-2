import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

interface MenuLinkProps {
  children: React.ReactNode
  variant: 'mobile' | 'desktop'
}

const MenuLink: FunctionComponent<MenuLinkProps> = ({ children, variant }) => {
  const { navOpen } = useSelector(selectGlobal())
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme
  const linkRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(linkRef.current, {
      duration,
      color: navOpen ? '#FFFFFF' : nav,
    })

    gsap.to('.svg-desktop-button path', {
      duration,
      fill: navOpen ? '#FFFFFF' : nav,
    })
  }, [navOpen, nav, duration])

  const variants = {
    mobile: 'text-4xl h-auto mr-0 mb-4 xl:mr-0',
    desktop: 'text-xl h-16 mx-4 xl:mx-6',
  }
  return (
    <div
      ref={linkRef}
      className={`flex items-center ${variants[variant]} font-bold uppercase `}
    >
      <Link href="/">{children}</Link>
    </div>
  )
}

export default MenuLink
