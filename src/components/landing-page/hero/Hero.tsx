import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import DesktopSpinner from '@components/landing-page/hero/DesktopSpinner'
import HeroMarquee from '@components/landing-page/hero/HeroMarquee'
import HeroTitle from '@components/landing-page/hero/HeroTitle'
import { selectGlobal } from '@redux/globalSlice'

const Hero: FunctionComponent = () => {
  const { heroSlides } = useSelector(selectGlobal())
  const [firstSlide] = heroSlides
  const { image } = firstSlide

  return (
    <section id="hero-section" className="relative">
      <div
        className="py-16 h-screen relative flex body-gutter-sm lg:body-gutter-lg
      xl:body-gutter-xl 2xl:body-gutter-2xl"
      >
        {image && <ContentfulImage image={image} />}
        <div className="absolute title-position">
          <HeroTitle />
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
