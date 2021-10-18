import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { useInView } from 'react-intersection-observer'
import { v4 as uuid } from 'uuid'

type BlockType = 'p' | 'h1' | 'h2' | 'h3'

interface OwnProps {
  children: React.ReactNode
  textStyles: string
  blockType?: BlockType
  delay?: number
}

type Props = OwnProps

const AnimatedText: FunctionComponent<Props> = ({
  children,
  blockType = 'p',
  textStyles,
  delay = 0.1,
}) => {
  const [id] = useState<string>(uuid())
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false)

  const textRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.8,
  })

  const childText = useRef<SplitText | null>(null)
  const parentText = useRef<SplitText | null>(null)

  useEffect(() => {
    gsap.registerPlugin(SplitText)
    document.fonts.ready.then(() => {
      if (!childText.current) {
        childText.current = new SplitText(textRef.current, {
          type: 'lines',
          position: 'relative',
          linesClass: `child-text-${id} transform translate-y-11/10 whitespace-nowrap`,
        })
      }

      if (!parentText.current) {
        parentText.current = new SplitText(textRef.current, {
          type: 'lines',
          position: 'relative',
          linesClass: `parent-text-${id} overflow-hidden`,
        })
      }

      setFontsLoaded(true)
    })
  }, [id])

  useEffect(() => {
    if (inView && fontsLoaded && parentText.current && childText.current) {
      gsap.set(textRef.current, {
        opacity: 1,
      })

      gsap.to(`.child-text-${id}`, {
        y: '0',
        delay,
        stagger: {
          each: 0.12,
          from: 'start',
        },
        onComplete: () => {
          if (parentText.current && childText.current) {
            parentText.current.revert()
            childText.current.revert()
            parentText.current = null
            childText.current = null
          }
        },
      })
    }
  }, [inView, fontsLoaded, id, delay])

  return (
    <div ref={ref} className="">
      {
        {
          p: (
            <p ref={textRef} className={`opacity-0 ${textStyles}`}>
              {children}
            </p>
          ),
          h1: (
            <h1 ref={textRef} className={`opacity-0 ${textStyles}`}>
              {children}
            </h1>
          ),
          h2: (
            <h2 ref={textRef} className={`opacity-0 ${textStyles}`}>
              {children}
            </h2>
          ),
          h3: (
            <h3 ref={textRef} className={`opacity-0 ${textStyles}`}>
              {children}
            </h3>
          ),
        }[blockType]
      }
    </div>
  )
}

export default AnimatedText
