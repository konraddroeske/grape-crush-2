import React, { FunctionComponent, useEffect, useRef } from 'react'

import { gsap } from 'gsap'

import { useInView } from 'react-intersection-observer'

import Star from '../../../assets/svgs/star.svg'

const SpinningStar: FunctionComponent = () => {
  const starRef = useRef<HTMLDivElement | null>(null)
  const animation = useRef<gsap.core.Timeline | null>(null)

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

  return (
    <div ref={ref}>
      <div ref={starRef} className="">
        <Star className="w-full" />
      </div>
    </div>
  )
}

export default SpinningStar
