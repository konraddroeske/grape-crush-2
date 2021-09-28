import React, { FunctionComponent, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import ShadowButton from '@components/common/ShadowButton'
import { closeModal } from '@redux/clientSlice'

const HeroModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const [scrollDistance, setScrollDistance] = useState<number>(0)

  const handleScroll = () => {
    setScrollDistance(window.scrollY)
  }

  useEffect(() => {
    if (window) {
      document.addEventListener('scroll', handleScroll)
    }

    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`${
        scrollDistance <= 200 ? 'hero-modal-position' : 'hero-modal-center'
      } w-full bg-lime p-6 sm:shadow-blue-dark-lg sm:w-96 transition-all ease-out duration-200`}
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
        <ShadowButton fn={() => dispatch(closeModal())}>Okay!</ShadowButton>
      </div>
    </div>
  )
}

export default HeroModal
