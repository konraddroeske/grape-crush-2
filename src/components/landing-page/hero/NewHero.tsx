import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import DesktopSpinner from '@components/landing-page/hero/DesktopSpinner'
import HeroMarquee from '@components/landing-page/hero/HeroMarquee'
import HeroTitle from '@components/landing-page/hero/HeroTitle'
import { selectGlobal } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

const NewHero: FunctionComponent = () => {
  const { heroSlides } = useSelector(selectHero())
  const { locale } = useSelector(selectGlobal())
  const [firstSlide] = heroSlides

  return (
    <section className="relative">
      <div className="py-16 h-screen relative flex body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
        <img
          className="block w-full my-0 mx-auto object-cover"
          src={firstSlide?.image?.file[locale].url}
          alt="label"
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2
        -translate-x-1/2 lg:top-10 lg:left-10 lg:right-0 lg:translate-y-0 lg:translate-x-0"
        >
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

export default NewHero
