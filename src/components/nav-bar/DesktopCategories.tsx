import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import { useMediaQuery } from 'react-responsive'

import NavCategories from '@components/nav-bar/NavCategories'
import { selectGlobal } from '@redux/globalSlice'

import NavWave from '../../assets/svgs/nav-wave.svg'

const DesktopCategories: FunctionComponent = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const { navOpen } = useSelector(selectGlobal())
  const [initialMargin, setInitialMargin] = useState<string | number>('-100%')

  const categoriesRef = useRef<HTMLDivElement | null>(null)
  const waveRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // set margin
    if (isDesktop) {
      const categoriesHeight = categoriesRef?.current?.offsetHeight || 0
      const wavesHeight = waveRef?.current?.offsetHeight || 0
      const height = categoriesHeight + wavesHeight

      setInitialMargin(-height)
    }
  }, [navOpen, isDesktop])

  return (
    <div
      ref={categoriesRef}
      className="hidden transition-all duration-300 lg:block fixed -z-10 top-0 left-0 right-0"
      style={{
        marginTop: navOpen ? 0 : initialMargin,
      }}
    >
      <NavCategories />
      <div ref={waveRef} className="left-0 top-full w-full">
        <NavWave className="w-full" />
      </div>
    </div>
  )
}

export default DesktopCategories
