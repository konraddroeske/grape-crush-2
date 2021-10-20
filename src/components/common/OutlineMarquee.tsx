import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from 'react-responsive'
import { v4 as uuid } from 'uuid'

interface Props {
  text: string
  direction?: '-=' | '+='
}

const OutlineMarquee: FunctionComponent<Props> = ({
  text,
  direction = '+=',
}) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isDesktopXl = useMediaQuery({ query: '(min-width: 1280px)' })
  const isDesktop2Xl = useMediaQuery({ query: '(min-width: 1536px)' })
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const [textArr, setTextArr] = useState<string[][] | null>(null)

  const containerRef = useRef<HTMLUListElement>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])
  const animation = useRef<gsap.core.Timeline | null>(null)
  const count = 8

  const initAnimation = useCallback(() => {
    const [textElement] = textRefs.current

    if (!textElement) return

    const { offsetWidth: width, offsetHeight: height } = textElement

    gsap.set(textRefs.current, {
      x: (i) => i * width,
    })

    gsap.set(containerRef.current, {
      x: -width,
      height,
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
      animation.current.kill()
      initAnimation()
    }
  }, [initAnimation])

  useEffect(() => {
    const filledArr = Array(count)
      .fill(null)
      .map(() => [uuid(), text])
    setTextArr(filledArr)
  }, [text])

  useEffect(() => {
    if (window && textArr && textRefs.current.length > 0) {
      document.fonts.ready.then(() => initAnimation())
    }
  }, [initAnimation, textArr])

  useEffect(() => {
    updateAnimation()
  }, [isDesktop, isDesktopXl, isDesktop2Xl, updateAnimation])

  useEffect(() => {
    if (!inView && animation.current) {
      animation.current.pause()
    }

    if (inView && animation.current) {
      animation.current.resume()
    }
  }, [inView])

  return (
    <div ref={ref} className="">
      <ul ref={containerRef} className="relative w-full">
        {textArr &&
          textArr.map(([key, ele], index) => {
            return (
              <li
                key={key}
                className="uppercase no-select text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl italic absolute px-2 font-bold
              text-transparent text-stroke-blue whitespace-nowrap hover:text-blue-dark cursor-pointer"
                ref={(el) => {
                  textRefs.current[index] = el
                }}
              >
                {ele}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default OutlineMarquee
