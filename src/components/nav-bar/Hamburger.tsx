import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useDispatch, useSelector } from 'react-redux'

import { selectGlobal, setNavOpen } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

const Hamburger: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { navOpen } = useSelector(selectGlobal())
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme

  const topBar = useRef<HTMLDivElement | null>(null)
  const midBar = useRef<HTMLDivElement | null>(null)
  const lowBar = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.to([topBar.current, midBar.current, lowBar.current], {
      duration,
      backgroundColor: navOpen ? '#FFFFFF' : nav,
    })
  }, [nav, navOpen, duration])

  return (
    <button
      type="button"
      className="flex flex-col justify-between h-3.5 lg:hidden"
      onClick={() => dispatch(setNavOpen(!navOpen))}
    >
      <div ref={topBar} className="w-5 h-0.5" />
      <div ref={midBar} className="w-5 h-0.5" />
      <div ref={lowBar} className="w-5 h-0.5" />
    </button>
  )
}

export default Hamburger
