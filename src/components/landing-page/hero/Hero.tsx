import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import DesktopSpinner from '@components/landing-page/hero/DesktopSpinner'
import HeroMarquee from '@components/landing-page/hero/HeroMarquee'
import HeroTitle from '@components/landing-page/hero/HeroTitle'
import SkipButton from '@components/landing-page/hero/SkipButton'
import { selectGlobal } from '@redux/globalSlice'

const Hero: FunctionComponent = () => {
  const { seoImage } = useSelector(selectGlobal())
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false)

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true)
    })
  }, [])

  return (
    <section id="hero-section" className="relative">
      <div
        className="py-16 h-screen relative flex body-gutter-sm lg:body-gutter-lg
      xl:body-gutter-xl 2xl:body-gutter-2xl"
      >
        <div className="relative flex w-full">
          {seoImage && <ContentfulImage image={seoImage} />}
          {fontsLoaded ? (
            <div className="absolute title-position">
              <HeroTitle />
            </div>
          ) : (
            <h1 className="sr-only">Natural Wines for Everyone</h1>
          )}
          <div className="hidden lg:block lg:absolute lg:bottom-6 lg:right-6">
            <SkipButton />
          </div>
        </div>
        <div className="block lg:hidden absolute left-10 bottom-20 transform translate-y-2 -translate-x-2">
          <HeroMarquee />
        </div>
      </div>
      <DesktopSpinner />
    </section>
  )
}

export default Hero
