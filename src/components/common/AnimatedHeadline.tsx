import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'

import { SplitText } from 'gsap/dist/SplitText'

import { getRandomInRange } from '@lib/animations'

interface OwnProps {
  text: string
  textStyle: string
  yoyo?: boolean
  repeat?: number
}

type Props = OwnProps

const AnimatedHeadline: FunctionComponent<Props> = ({
  text,
  textStyle,
  yoyo = false,
  repeat = 0,
}) => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(SplitText)

    const splitHeadline = new SplitText(textRef.current, {
      type: 'words,chars',
      position: 'relative',
    })

    splitHeadline.chars.forEach((char) => {
      const yPos = getRandomInRange(50, 100)
      const xPos = getRandomInRange(-50, 50)
      const scale = getRandomInRange(0.1, 0.3)

      gsap.set(char, {
        opacity: 0,
        y: `${yPos}%`,
        x: `${xPos}%`,
        scale,
      })
    })

    gsap.set(textRef.current, {
      opacity: 1,
    })

    splitHeadline.chars.forEach((char) => {
      const ease = getRandomInRange(1.5, 2.5)
      const delay = getRandomInRange(0.2, 0.5)

      const tl = gsap.timeline({
        yoyo,
        repeat,
      })

      tl.to(char, {
        duration: 0.75 - delay,
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        ease: `back.out(${ease})`,
        delay,
      }).repeatDelay(3.5)
    })
  }, [text, yoyo, repeat])

  return (
    <div ref={textRef} className={`${textStyle} opacity-0`}>
      {text}
    </div>
  )
}

export default AnimatedHeadline
