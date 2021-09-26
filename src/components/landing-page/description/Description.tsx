import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'

import { useMediaQuery } from 'react-responsive'

import ShadowLink from '@components/common/ShadowLink'

const Description: FunctionComponent = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const [desktopDistance, setDesktopDistance] = useState<number>(0)
  const [mobileDistance, setMobileDistance] = useState<number>(0)

  const getDistanceFromTop = (element: HTMLElement) => {
    return element.getBoundingClientRect().top + window.scrollY
  }

  const getDistanceFromBottom = (element: HTMLElement) => {
    return (
      element.getBoundingClientRect().top +
      window.scrollY +
      element.offsetHeight
    )
  }

  const handleDistance = useCallback(() => {
    if (isDesktop) {
      const heroSection = document.getElementById('hero-section')
      const desktopSwirl = document.getElementById('desktop-swirl')

      if (desktopSwirl && heroSection) {
        const swirlDistance = getDistanceFromBottom(desktopSwirl)
        const heroDistance = getDistanceFromBottom(heroSection)

        const diff = swirlDistance - heroDistance
        setDesktopDistance(diff)
      }
    } else {
      const mobileSwirl = document.getElementById('mobile-swirl')
      const descriptionText = document.getElementById('description-text')

      if (mobileSwirl && descriptionText) {
        const swirlDistance = getDistanceFromBottom(mobileSwirl)
        const descriptionDistance = getDistanceFromTop(descriptionText)
        const diff = descriptionDistance - swirlDistance

        if (diff < 20 && mobileDistance < 20) {
          setMobileDistance(diff + 20)
        } else if (diff >= 20) {
          setMobileDistance(
            diff - mobileDistance > 0 ? 0 : diff - mobileDistance
          )
        }
      }
    }
  }, [isDesktop, mobileDistance])

  useEffect(() => {
    if (window) {
      handleDistance()
      window.addEventListener('resize', handleDistance)
    }

    return () => window.removeEventListener('resize', handleDistance)
  }, [handleDistance])

  return (
    <section
      className="flex flex-col lg:flex-row body-gutter-sm lg:body-gutter-lg
      xl:body-gutter-xl 2xl:pt-24"
      style={{
        paddingTop: isDesktop ? `${desktopDistance}px` : `${mobileDistance}px`,
      }}
    >
      <div className="w-full lg:w-1/2 lg:pr-8">
        <h2
          className="flex flex-col text-4xl sm:text-6xl text-blue-dark font-bold
        uppercase xl:text-7xl 2xl:text-8xl"
          style={{
            marginTop:
              isDesktop && desktopDistance !== 0
                ? `-${desktopDistance / 2}px`
                : 0,
          }}
        >
          <span>Find your</span>
          <span>next grape</span>
          <span>crush</span>
        </h2>
      </div>
      <div className="w-full pt-4 pt-12 lg:w-1/2 lg:pt-16">
        <p
          id="description-text"
          className="font-headline text-blue-dark text-base sm:text-xl font-medium
        xl:text-2xl 2xl:text-3xl"
        >
          We work with some of our favourite sommeliers and local{' '}
          <span className="bg-lime">wine enthusiasts</span> to bring you a
          curated selection of natural, biodynamic and classic wines.
        </p>
        <div className="my-4 xl:my-6 2xl:my-8 flex">
          <Link href="/about">
            <a>
              <ShadowLink>Learn more</ShadowLink>
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Description
