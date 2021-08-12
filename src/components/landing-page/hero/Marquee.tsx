import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { v4 as uuid } from 'uuid'

const Marquee: FunctionComponent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])

  const textArr = Array(3).fill('Shop wines')

  useEffect(() => {
    // console.log('rerunning marquee animation')
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

      gsap.to(textRefs.current, {
        duration: 10,
        ease: 'none',
        x: `+=${width * 3}`,
        modifiers: {
          x: gsap.utils.unitize((x: string) => parseFloat(x) % (width * 3)),
        },
        repeat: -1,
      })
    }
  })

  return (
    <button
      type="button"
      ref={buttonRef}
      className="relative w-40 bg-lime overflow-hidden"
    >
      <div ref={containerRef} className="h-6">
        {textArr.map((text, index) => {
          return (
            <div
              key={uuid()}
              className="leading-7 uppercase text-base absolute px-2 font-bold
              text-blue-dark"
              ref={(el) => {
                textRefs.current[index] = el
              }}
            >
              {text}
            </div>
          )
        })}
      </div>
    </button>
  )
}

export default Marquee
