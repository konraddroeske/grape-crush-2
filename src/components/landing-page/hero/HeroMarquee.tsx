import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from 'react-responsive'
import { v4 as uuid } from 'uuid'

const HeroMarquee: FunctionComponent = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const [textArr, setTextArr] = useState<string[][] | null>(null)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])
  const animation = useRef<gsap.core.Timeline | null>(null)

  const initAnimation = useCallback(() => {
    const [textElement] = textRefs.current

    const dimensions = textElement ? textElement.getBoundingClientRect() : null

    if (!dimensions) return

    const { width, height } = dimensions

    if (width <= 0) return

    gsap.set(containerRef.current, {
      x: -width,
      height,
    })

    gsap.set(textRefs.current, {
      x: (i) => i * width,
    })

    const tl = gsap.timeline()

    animation.current = tl.to(textRefs.current, {
      duration: 10,
      ease: 'none',
      x: `+=${width * 3}`,
      modifiers: {
        x: gsap.utils.unitize((x: string) => parseFloat(x) % (width * 3)),
      },
      repeat: -1,
    })
  }, [])

  useEffect(() => {
    if (!textArr) {
      const filledArr = Array(8)
        .fill(null)
        .map(() => [uuid(), 'Shop wines'])
      setTextArr(filledArr)
    }
  }, [textArr])

  useEffect(() => {
    if (window && textArr && textRefs.current.length > 0) {
      initAnimation()
    }
  }, [isDesktop, initAnimation, textArr])

  useEffect(() => {
    if (!inView && animation.current) {
      animation.current.pause()
    }

    if (inView && animation.current) {
      animation.current.play()
    }
  }, [inView])

  return (
    <div ref={ref} className="flex">
      <button
        type="button"
        ref={buttonRef}
        className="relative w-48 lg:w-40 bg-lime overflow-hidden"
      >
        <div ref={containerRef} className="h-6">
          {textArr &&
            textArr.map(([key, text], index) => {
              return (
                <div
                  key={key}
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
    </div>
  )
}

export default HeroMarquee
