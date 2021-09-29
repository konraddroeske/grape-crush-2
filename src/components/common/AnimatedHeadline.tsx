import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'

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

    const getRandomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    splitHeadline.chars.forEach((char) => {
      const yPos = getRandomInRange(3, 8)
      const xPos = getRandomInRange(-3, 3)
      const scale = getRandomInRange(0.1, 0.3)
      const ease = getRandomInRange(1.5, 2.5)
      const delay = getRandomInRange(0.2, 0.5)

      const tl = gsap.timeline({
        yoyo,
        repeat,
      })

      tl.from(char, {
        duration: 0.75 - delay,
        opacity: 0,
        y: `${yPos}rem`,
        x: `${xPos}rem`,
        scale,
        ease: `back.out(${ease})`,
        delay,
      }).repeatDelay(3.5)
    })
  }, [text, yoyo, repeat])

  return (
    <div ref={textRef} className={textStyle}>
      {text}
    </div>
  )
}

export default AnimatedHeadline
