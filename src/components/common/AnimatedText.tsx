import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { useInView } from 'react-intersection-observer'

interface OwnProps {
  children: React.ReactNode
  textStyles: string
}

type Props = OwnProps

const AnimatedText: FunctionComponent<Props> = ({ children, textStyles }) => {
  const textRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 1,
  })

  const childText = useRef<SplitText | null>(null)
  const parentText = useRef<SplitText | null>(null)

  useEffect(() => {
    gsap.registerPlugin(SplitText)

    childText.current = new SplitText(textRef.current, {
      type: 'lines',
      position: 'relative',
      linesClass: 'child-text transform translate-y-full',
    })

    parentText.current = new SplitText(textRef.current, {
      type: 'lines',
      position: 'relative',
      linesClass: 'parent-text overflow-hidden',
    })
  }, [])

  useEffect(() => {
    if (inView) {
      gsap.to('.child-text', {
        y: '0',
        delay: 0.2,
        stagger: {
          each: 0.12,
          from: 'start',
        },
        onComplete: () => {
          if (parentText.current && childText.current) {
            parentText.current.revert()
            childText.current.revert()
          }
        },
      })
    }
  }, [inView])

  return (
    <div ref={ref}>
      <p ref={textRef} className={textStyles}>
        {children}
      </p>
    </div>
  )
}

export default AnimatedText
