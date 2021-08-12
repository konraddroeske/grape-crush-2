import React, { FunctionComponent, useEffect } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

import GrapeCrushLogo from '../../assets/svgs/grape-crush-logo.svg'

const Logo: FunctionComponent = () => {
  const { navOpen } = useSelector(selectGlobal())
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme

  useEffect(() => {
    gsap.to('.svg-logo path', {
      duration,
      fill: navOpen ? '#414042' : nav,
    })
  }, [nav, navOpen, duration])

  return (
    <div
      className={`opacity-0 font-sans w-36 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    lg:static lg:inset-auto lg:translate-x-0 lg:translate-y-0`}
    >
      <GrapeCrushLogo className="w-full svg-logo" />
    </div>
  )
}

export default Logo
