import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import { selectHero } from '@redux/heroSlice'

const Hamburger: FunctionComponent = () => {
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme

  const topBar = useRef<HTMLDivElement | null>(null)
  const midBar = useRef<HTMLDivElement | null>(null)
  const lowBar = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.to([topBar.current, midBar.current, lowBar.current], {
      duration,
      backgroundColor: nav,
    })
  }, [nav, duration])

  return (
    <div className="flex flex-col justify-between h-3.5">
      <div ref={topBar} className="w-5 h-0.5" />
      <div ref={midBar} className="w-5 h-0.5" />
      <div ref={lowBar} className="w-5 h-0.5" />
    </div>
  )
}

export default Hamburger
