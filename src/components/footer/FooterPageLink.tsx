import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import Link from 'next/link'

import { Direction } from '@models/misc'

interface OwnProps {
  children: React.ReactNode
  text: string
  to: string
  direction: Direction
}

type Props = OwnProps

const FooterPageLink: FunctionComponent<Props> = ({
  children,
  text,
  to,
  direction,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const shape = useRef<HTMLDivElement>(null)
  const animation = useRef<gsap.core.Timeline | null>(null)
  const [play, setPlay] = useState<boolean>(false)

  useEffect(() => {
    const tl = gsap.timeline()

    animation.current = tl.to(shape.current, {
      duration: 30,
      rotation: `${direction}360`,
      transformOrigin: 'center center',
      ease: 'none',
      paused: false,
      repeat: -1,
    })

    animation.current.pause()
  }, [direction])

  useEffect(() => {
    if (!play && animation.current) {
      animation.current.pause()
    }

    if (play && animation.current) {
      animation.current.resume()
    }
  }, [play])

  return (
    <div
      ref={container}
      className="relative cursor-pointer my-16 lg:my-0"
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Link href={to}>
        <a>
          <div className="cursor-pointer text-center">
            <span
              className="relative z-10 uppercase text-5xl lg:text-6xl xl:text-7xl
            text-blue-dark font-bold"
            >
              {text}
            </span>
          </div>
          <div className="absolute w-36 lg:w-44 xl:w-52 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div ref={shape}>{children}</div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default FooterPageLink
