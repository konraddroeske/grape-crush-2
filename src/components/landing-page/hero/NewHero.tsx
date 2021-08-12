import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useSelector } from 'react-redux'

import HeroTitle from '@components/landing-page/hero/HeroTitle'
import SpinningStar from '@components/landing-page/hero/SpinningStar'
import { remToPixels } from '@lib/remToPixels'
import { selectGlobal } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

import NewLogo from '../../../assets/svgs/new-logo.svg'

const NewHero: FunctionComponent = () => {
  const { heroSlides } = useSelector(selectHero())
  const { locale } = useSelector(selectGlobal())
  const [firstSlide] = heroSlides

  const [isSticky, setIsSticky] = useState<boolean>(false)
  const logoRef = useRef<HTMLDivElement | null>(null)

  const handleHeight = useCallback(() => {
    if (window && logoRef?.current) {
      const distanceToTop = logoRef.current.getBoundingClientRect().top
      const pixels = remToPixels(2)
      // console.log('distance to top', distanceToTop, pixels)

      if (distanceToTop <= pixels && !isSticky) {
        setIsSticky(true)
      }

      if (distanceToTop > pixels && isSticky) {
        setIsSticky(false)
      }
    }
  }, [isSticky])

  useEffect(() => {
    if (window) {
      // handleHeight()
      window.addEventListener('scroll', handleHeight)
    }

    return () => {
      window.removeEventListener('scroll', handleHeight)
    }
  }, [handleHeight])

  return (
    <section className="">
      <div className="p-16 h-screen relative flex">
        <img
          className="block w-full my-0 mx-auto object-cover"
          src={firstSlide.image.file[locale].url}
          alt="label"
        />
        <div className="absolute top-10 left-10 right-0">
          <HeroTitle />
        </div>
        <div ref={logoRef} className="absolute left-16 bottom-16">
          <div className={`${isSticky ? 'fixed top-8' : 'relative'} z-10`}>
            <div
              className={`${
                isSticky ? 'w-36' : 'w-44'
              } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <SpinningStar />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NewLogo className={`${isSticky ? 'w-20' : 'w-24'}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewHero
