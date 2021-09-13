import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import NewLogo from '@assets/svgs/new-logo.svg'
import SpinningStar from '@components/landing-page/hero/SpinningStar'
import { selectGlobal } from '@redux/globalSlice'

const MobileSpinner: FunctionComponent = () => {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { navOpen } = useSelector(selectGlobal())
  const starRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
  }, [])

  useEffect(() => {
    const duration = 0.4

    gsap.to(starRef.current, {
      duration,
      opacity: navOpen ? 0 : 1,
    })

    gsap.to('.svg-mobile-logo path', {
      duration,
      fill: navOpen ? '#dfff85' : '#2c148e',
    })
  }, [navOpen])

  const handleScroll = () => {
    gsap.to(window, {
      scrollTo: 0,
    })
  }

  return (
    <div
      ref={containerRef}
      className={`${router.pathname === '/' ? 'block' : 'hidden'} lg:hidden`}
    >
      <button
        type="button"
        className="fixed top-8 left-1/2 z-10"
        onClick={() => handleScroll()}
      >
        <div
          ref={starRef}
          className="w-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <SpinningStar />
        </div>
        <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <NewLogo className="w-16 svg-mobile-logo" />
        </div>
      </button>
    </div>
  )
}

export default MobileSpinner
