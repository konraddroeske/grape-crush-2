import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { gsap } from 'gsap'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from 'react-responsive'
import { v4 as uuid } from 'uuid'

const HeroMarquee: FunctionComponent = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const [textArr, setTextArr] = useState<string[][] | null>(null)

  const buttonRef = useRef<HTMLAnchorElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])
  const animation = useRef<gsap.core.Timeline | null>(null)
  const count = 8

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

    const totalWidth = width * count
    const mod = gsap.utils.wrap(0, totalWidth)

    const tl = gsap.timeline()

    animation.current = tl.to(textRefs.current, {
      duration: totalWidth / 50,
      ease: 'none',
      x: `+=${totalWidth}`,
      modifiers: {
        x: (x) => `${mod(parseFloat(x))}px`,
      },
      repeat: -1,
    })
  }, [])

  useEffect(() => {
    if (!textArr) {
      const filledArr = Array(count)
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
      animation.current.resume()
    }
  }, [inView])

  return (
    <div ref={ref} className="flex">
      <Link href="/products">
        <a
          ref={buttonRef}
          className="relative marquee-size bg-lime overflow-hidden"
        >
          <div ref={containerRef} className="h-6">
            {textArr &&
              textArr.map(([key, text], index) => {
                return (
                  <div
                    key={key}
                    className="leading-7 uppercase text-base absolute px-2 lg:leading-8 font-bold
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
        </a>
      </Link>
    </div>
  )
}

export default HeroMarquee
