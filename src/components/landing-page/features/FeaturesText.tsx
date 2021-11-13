import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'

import Link from 'next/link'

import ShadowLink from '@components/common/buttons/ShadowLink'
import {
  buttonSlideIn,
  buttonSlideOut,
  getRandomInRange,
  headlineTextIn,
  headlineTextOut,
} from '@lib/animations'
import { IHeroSlideFields } from '@models/contentful-graph'

interface OwnProps {
  slides: IHeroSlideFields[]
  upcomingSlide: number
}

type Props = OwnProps

const FeaturesText: FunctionComponent<Props> = ({ upcomingSlide, slides }) => {
  const containerRefs = useRef<(HTMLLIElement | null)[]>([])
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([])
  const prevSlide = useRef<number>(0)
  const [splitHeadlines, setSplitHeadlines] = useState<SplitText[]>([])

  useEffect(() => {
    gsap.registerPlugin(SplitText)

    const splitTextArr = textRefs.current.map((ele) => {
      const splitItems = new SplitText(ele, {
        type: 'words,chars',
        position: 'relative',
      })

      const yPos = getRandomInRange(30, 40)
      const xPos = getRandomInRange(-20, 20)
      const scale = getRandomInRange(0.1, 0.3)

      gsap.set(splitItems.words, {
        display: 'block',
      })

      gsap.set(splitItems.chars, {
        opacity: 0,
        y: `${yPos}%`,
        x: `${xPos}%`,
        scale,
      })

      return splitItems
    })

    buttonRefs.current.forEach((ref) => {
      gsap.set(ref, {
        y: '1rem',
        opacity: 0,
      })
    })

    setSplitHeadlines(splitTextArr)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        prevSlide.current = upcomingSlide
      },
    })

    if (splitHeadlines[prevSlide.current]) {
      headlineTextOut(splitHeadlines[prevSlide.current])
    }

    if (splitHeadlines[upcomingSlide]) {
      headlineTextIn(splitHeadlines[upcomingSlide])
    }

    if (buttonRefs.current?.[prevSlide.current] != null) {
      tl.set(buttonRefs.current[prevSlide.current], {
        pointerEvents: 'none',
      })
      buttonSlideOut(buttonRefs.current[prevSlide.current]!)
    }

    if (buttonRefs.current?.[upcomingSlide] != null) {
      tl.set(buttonRefs.current[upcomingSlide], {
        pointerEvents: 'auto',
      })
      buttonSlideIn(buttonRefs.current[upcomingSlide]!)
    }
  }, [splitHeadlines, upcomingSlide])

  return (
    <ul className="">
      {slides.map((slide, index) => {
        return (
          <li
            key={slide.title}
            ref={(el) => {
              containerRefs.current[index] = el
            }}
            className="absolute z-10 pointer-events-none left-0 top-1/2
            transform -translate-y-1/2 body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl"
          >
            <h2
              ref={(el) => {
                textRefs.current[index] = el
              }}
              className="no-select uppercase text-5xl xs:text-6xl sm:text-8xl xl:text-9xl
              2xl:text-10xl text-blue-dark font-bold"
            >
              {slide.title}
            </h2>
            <div
              ref={(el) => {
                buttonRefs.current[index] = el
              }}
              className="flex mt-4"
            >
              <Link href={`${slide.link}`}>
                <a>
                  <ShadowLink>Explore</ShadowLink>
                </a>
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default FeaturesText
