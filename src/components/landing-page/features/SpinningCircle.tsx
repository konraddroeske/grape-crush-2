import React, { FunctionComponent, useEffect, useRef } from 'react'

import { gsap } from 'gsap'

import CircleText from '@assets/svgs/circle-text.svg'
import { Direction } from '@models/hero'

interface Props {
  direction?: Direction
}

const SpinningCircle: FunctionComponent<Props> = ({
  direction = Direction.Left,
}) => {
  const circleRef = useRef<HTMLDivElement | null>(null)
  const animation = useRef<gsap.core.Timeline | null>(null)

  const initAnimation = () => {
    const reverseRepeat = () => {
      if (animation.current) {
        animation.current.reverse(0)
      }
    }

    const complete = () => {
      if (animation.current) {
        animation.current.restart()
      }
    }

    const tl = gsap.timeline({
      onReverseComplete: reverseRepeat,
      onComplete: complete,
    })

    animation.current = tl.to(circleRef.current, {
      duration: 10,
      css: { rotation: 360 },
      ease: 'none',
      paused: false,
      repeat: -1,
    })
  }

  const updateAnimation = (newDirection: Direction) => {
    if (animation.current && newDirection === Direction.Left) {
      animation.current.reverse()
    }

    if (animation.current && newDirection === Direction.Right) {
      animation.current.play()
    }
  }

  useEffect(() => {
    initAnimation()
  }, [])

  useEffect(() => {
    updateAnimation(direction)
  }, [direction])

  return (
    <div ref={circleRef} className="">
      <CircleText />
    </div>
  )
}

export default SpinningCircle
