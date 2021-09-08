import React, { FunctionComponent, useEffect } from 'react'

import gsap from 'gsap'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

import NewLogo from '../../assets/svgs/new-logo.svg'

const Logo: FunctionComponent = () => {
  const { navOpen } = useSelector(selectGlobal())
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme
  const router = useRouter()

  useEffect(() => {
    gsap.to('.svg-logo path', {
      duration,
      fill: navOpen ? '#FFFFFF' : nav,
    })
  }, [nav, navOpen, duration])

  return (
    <div
      className={`${
        router.pathname !== '/' ? 'block' : 'hidden'
      } font-sans w-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    lg:static lg:inset-auto lg:translate-x-0 lg:translate-y-0`}
    >
      <NewLogo className="w-full svg-logo" />
    </div>
  )
}

export default Logo
