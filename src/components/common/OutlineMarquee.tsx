import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { v4 as uuid } from 'uuid'

interface Props {
  text: string
  direction?: '-=' | '+='
}

const OutlineMarquee: FunctionComponent<Props> = ({
  text,
  direction = '+=',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])

  const textArr = Array(4).fill(text)

  useEffect(() => {
    if (textRefs.current.length > 0) {
      const [textElement] = textRefs.current

      const dimensions = textElement
        ? textElement.getBoundingClientRect()
        : null

      if (!dimensions) return

      const { width, height } = dimensions

      gsap.set(containerRef.current, {
        x: -width,
        height,
      })

      gsap.set(textRefs.current, {
        x: (i) => i * width,
      })

      const totalWidth = width * 4
      const mod = gsap.utils.wrap(0, totalWidth)

      gsap.to(textRefs.current, {
        duration: 20,
        ease: 'none',
        x: `${direction}${totalWidth}`,
        modifiers: {
          x: (x) => `${mod(parseFloat(x))}px`,
        },
        repeat: -1,
      })
    }
  })

  return (
    <div ref={containerRef} className="relative h-40 w-full">
      {textArr.map((ele, index) => {
        return (
          <div
            key={uuid()}
            className="uppercase text-7xl xl:text-8xl italic absolute px-2 font-bold
              text-transparent text-stroke-blue whitespace-nowrap"
            ref={(el) => {
              textRefs.current[index] = el
            }}
          >
            {ele}
          </div>
        )
      })}
    </div>
  )
}

export default OutlineMarquee
