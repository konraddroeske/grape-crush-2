import React, { FunctionComponent, useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { useDispatch, useSelector } from 'react-redux'

import { hamburgerClose, hamburgerOpen } from '@lib/animations'
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

    if (topBar.current && midBar.current && lowBar.current && navOpen) {
      hamburgerOpen(topBar, midBar, lowBar, duration / 4)
    }

    if (topBar.current && midBar.current && lowBar.current && !navOpen) {
      hamburgerClose(topBar, midBar, lowBar, duration / 4)
    }
  }, [nav, navOpen, duration])

  return (
    <button
      type="button"
      className="relative flex flex-col justify-between h-3.5 w-5 lg:hidden"
      onClick={() => dispatch(setNavOpen(!navOpen))}
      aria-label="open menu"
    >
      <div ref={topBar} className="absolute w-5 h-0.5 top-0 left-0" />
      <div
        ref={midBar}
        className="absolute w-5 h-0.5 top-1/2 left-0 transform -translate-y-1/2"
      />
      <div ref={lowBar} className="absolute w-5 h-0.5 bottom-0 left-0" />
    </button>
  )
}

export default Hamburger
