import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useInView } from 'react-intersection-observer'
import { v4 as uuid } from 'uuid'

interface Props {
  text: string
  direction?: '-=' | '+='
}

const OutlineMarquee: FunctionComponent<Props> = ({
  text,
  direction = '+=',
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])
  const animation = useRef<gsap.core.Timeline | null>(null)
  const count = 8
  const textArr = Array(count).fill(text)

  const initAnimation = useCallback(() => {
    const [textElement] = textRefs.current

    const dimensions = textElement ? textElement.getBoundingClientRect() : null

    if (!dimensions) return

    const { width, height } = dimensions

    gsap.set(containerRef.current, {
      x: -width,
      height,
    })

    gsap.set(textRefs.current, {
      x: (i) => i * width,
    })

    const totalWidth = width * count
    const mod = gsap.utils.wrap(0, totalWidth)

    const tl = gsap.timeline()

    animation.current = tl.to(textRefs.current, {
      duration: totalWidth / 100,
      ease: 'none',
      x: `${direction}${totalWidth}`,
      modifiers: {
        x: (x) => `${mod(parseFloat(x))}px`,
      },
      repeat: -1,
    })
  }, [direction])

  const updateAnimation = useCallback(() => {
    if (animation.current) {
      animation.current.pause()
      initAnimation()
    }
  }, [initAnimation])

  useEffect(() => {
    if (window && textRefs.current.length > 0) {
      initAnimation()
      window.addEventListener('resize', updateAnimation)
    }

    return () => {
      window.removeEventListener('resize', updateAnimation)
    }
  })

  useEffect(() => {
    // console.log('marquee in view', inView)
    if (!inView && animation.current) {
      animation.current.pause()
    }

    if (inView && animation.current) {
      animation.current.play()
    }
  }, [inView])

  return (
    <div ref={ref} className="pointer-events-none">
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
    </div>
  )
}

export default OutlineMarquee
