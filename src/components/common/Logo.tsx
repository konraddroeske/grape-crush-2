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
      fill: nav,
    })
  }, [nav, duration])

  useEffect(() => {
    gsap.set('.svg-logo path', {
      fill: navOpen ? '#414042' : nav,
    })
  }, [navOpen, nav])

  return (
    <div className="font-sans w-36 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <GrapeCrushLogo className="w-full svg-logo svg-gray-dark" />
    </div>
  )
}

export default Logo
