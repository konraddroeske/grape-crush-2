import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

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
  const textRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.8,
  })

  const childText = useRef<SplitText | null>(null)
  const parentText = useRef<SplitText | null>(null)

  const checkFontsLoaded = useCallback(async () => {
    return document.fonts.ready
  }, [])

  useEffect(() => {
    gsap.registerPlugin(SplitText)
    checkFontsLoaded().then(() => {
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
    })
  }, [id, checkFontsLoaded])

  useEffect(() => {
    if (inView && parentText.current && childText.current) {
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
  }, [inView, id, delay])

  return (
    <div ref={ref} className="">
      {
        {
          p: (
            <p ref={textRef} className={textStyles}>
              {children}
            </p>
          ),
          h1: (
            <h1 ref={textRef} className={textStyles}>
              {children}
            </h1>
          ),
          h2: (
            <h2 ref={textRef} className={textStyles}>
              {children}
            </h2>
          ),
          h3: (
            <h3 ref={textRef} className={textStyles}>
              {children}
            </h3>
          ),
        }[blockType]
      }
    </div>
  )
}

export default AnimatedText
