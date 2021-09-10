import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import NewLogo from '@assets/svgs/new-logo.svg'
import SpinningStar from '@components/landing-page/hero/SpinningStar'
import { remToPixels } from '@lib/remToPixels'
import { selectGlobal } from '@redux/globalSlice'

const DesktopSpinner: FunctionComponent = () => {
  const { navOpen } = useSelector(selectGlobal())
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const starRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  const handleHeight = useCallback(() => {
    if (window && containerRef?.current) {
      const distanceToTop = containerRef.current.getBoundingClientRect().top
      const pixels = remToPixels(2)

      if (!isDesktop) {
        setIsSticky(false)
      } else if (distanceToTop <= pixels && !isSticky) {
        setIsSticky(true)
      } else if (distanceToTop > pixels && isSticky) {
        setIsSticky(false)
      }
    }
  }, [isDesktop, isSticky])

  useEffect(() => {
    if (window) {
      handleHeight()
      window.addEventListener('scroll', handleHeight)
    }

    return () => {
      window.removeEventListener('scroll', handleHeight)
    }
  }, [handleHeight])

  useEffect(() => {
    const duration = 0.3

    if (isSticky && !navOpen) {
      gsap.set(logoRef.current, {
        position: 'fixed',
        top: '2rem',
      })
    } else if (!isSticky && !navOpen && logoRef.current) {
      const tl = gsap.timeline()

      if (getComputedStyle(logoRef.current).position === 'fixed') {
        const height = window.innerHeight - remToPixels(8) - window.scrollY
        tl.set(logoRef.current, {
          position: 'absolute',
          top: -height,
        }).to(logoRef.current, {
          top: 'auto',
          duration,
        })
      } else {
        tl.set(logoRef.current, {
          position: 'absolute',
          top: 'auto',
        })
      }
    } else if (isSticky && navOpen) {
      const tl = gsap.timeline()
      tl.set(logoRef.current, {
        position: 'fixed',
      }).to(logoRef.current, {
        top: '2rem',
        duration,
      })
    } else if (!isSticky && navOpen) {
      const tl = gsap.timeline()
      const distanceFromBottom = window.scrollY + remToPixels(6)
      const distanceFromTop = window.innerHeight - distanceFromBottom

      tl.set(logoRef.current, {
        top: distanceFromTop,
        position: 'fixed',
      }).to(logoRef.current, {
        top: '2rem',
      })
    }
  }, [navOpen, isSticky])

  return (
    <div
      ref={containerRef}
      className="z-30 hidden lg:block absolute bottom-24 lg:left-16 xl:left-20 2xl:left-24"
    >
      <div ref={logoRef} className="absolute z-10">
        <div
          ref={starRef}
          className={`${
            isSticky || navOpen ? 'w-28' : 'w-44'
          } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              transition-all`}
        >
          <SpinningStar />
        </div>
        <div
          ref={textRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <NewLogo
            className={`spinner-logo-svg ${
              isSticky || navOpen ? 'w-20' : 'w-24'
            } transition-all`}
          />
        </div>
      </div>
    </div>
  )
}

export default DesktopSpinner
