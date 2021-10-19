import React, { FunctionComponent, useEffect, useRef } from 'react'

import { gsap } from 'gsap'

import { useInView } from 'react-intersection-observer'

import { useSelector } from 'react-redux'

import { selectIndex } from '@redux/indexSlice'

import Star from '../../../assets/svgs/star.svg'

const SpinningStar: FunctionComponent = () => {
  const starRef = useRef<HTMLDivElement | null>(null)
  const animation = useRef<gsap.core.Timeline | null>(null)
  const { bgLime } = useSelector(selectIndex())

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const updateAnimation = () => {
    if (animation?.current?.isActive()) {
      animation.current.pause(0)
      animation.current.kill()
    }

    const tl = gsap.timeline()

    animation.current = tl.to(starRef.current, {
      duration: 10,
      css: { rotation: 360 },
      ease: 'none',
      paused: false,
      repeat: -1,
    })
  }

  useEffect(() => {
    if (animation?.current?.isActive()) {
      animation.current.pause()
    }

    if (animation.current && inView) {
      animation.current.resume()
    }
  }, [inView])

  useEffect(() => {
    updateAnimation()
  }, [])

  useEffect(() => {
    if (bgLime) {
      gsap.to('.svg-spinning-star path', {
        fill: '#2c148e',
      })
    } else {
      gsap.to('.svg-spinning-star path', {
        fill: '#dfff85',
      })
    }
  }, [bgLime])

  return (
    <div ref={ref}>
      <div ref={starRef} className="">
        <Star className="w-full svg-spinning-star" />
      </div>
    </div>
  )
}

export default SpinningStar
