import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'

import Star from '../../../assets/svgs/star.svg'

const SpinningStar: FunctionComponent = () => {
  const starRef = useRef<HTMLDivElement | null>(null)
  const animation = useRef<gsap.core.Tween | null>(null)

  const updateAnimation = () => {
    if (animation?.current?.isActive()) {
      animation.current.pause(0)
      animation.current.kill()
    }

    animation.current = gsap.to(starRef.current, {
      duration: 10,
      css: { rotation: 360 },
      ease: 'none',
      paused: false,
      repeat: -1,
    })
  }

  useEffect(() => {
    updateAnimation()
  }, [])

  return (
    <div ref={starRef} className="">
      <Star className="w-full" />
    </div>
  )
}

export default SpinningStar
