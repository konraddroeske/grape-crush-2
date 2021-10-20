import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { setCookies } from 'cookies-next'
import { useDispatch } from 'react-redux'

import ShadowButton from '@components/common/ShadowButton'
import { modalSlideUp } from '@lib/animations'
import { closeModal } from '@redux/clientSlice'

const HeroModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollDistance, setScrollDistance] = useState<number>(0)

  const getOneMonthDate = () => {
    const now = new Date()
    return new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours()
    )
  }

  const handleScroll = () => {
    setScrollDistance(window.scrollY)
  }

  const handleClick = () => {
    setCookies('grapeCrushAgeConsent', true, {
      expires: getOneMonthDate(),
    })
    dispatch(closeModal())
  }

  useEffect(() => {
    if (ref.current) {
      modalSlideUp(ref.current)
    }

    if (window) {
      document.addEventListener('scroll', handleScroll)
    }

    return () => document.removeEventListener('scroll', handleScroll)
  }, [scrollDistance])

  return (
    <div
      className={`${
        scrollDistance <= 200 ? 'hero-modal-position' : 'hero-modal-center'
      } w-full sm:w-96 transition-all ease-out duration-300`}
    >
      <div
        ref={ref}
        className="w-full p-6 opacity-0 transform translate-y-40 bg-lime sm:shadow-blue-dark-lg"
      >
        <h3
          className="text-center font-bold uppercase text-5xl text-transparent
          text-stroke-blue-thin"
        >
          Hold On
        </h3>
        <p className="text-blue-dark mt-2 mb-3">
          By continuing you confirm you are 19+ years of age and legally able to
          buy and consume alcohol.
        </p>
        <div className="flex justify-center">
          <ShadowButton fn={handleClick}>Okay!</ShadowButton>
        </div>
      </div>
    </div>
  )
}

export default HeroModal
