import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import ShadowLink from '@components/common/ShadowLink'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectIndex } from '@redux/indexSlice'

import StarOutline from '../../../../assets/svgs/star-outline.svg'

const NewInfoBox3: FunctionComponent = () => {
  const { infoBox3 } = useSelector(selectIndex())
  const animation = useRef<gsap.core.Timeline | null>(null)
  const shape = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    const tl = gsap.timeline()

    animation.current = tl.to(shape.current, {
      duration: 25,
      rotation: '360',
      transformOrigin: 'center center',
      ease: 'none',
      paused: false,
      repeat: -1,
    })
    animation.current.pause()
  }, [])

  useEffect(() => {
    if (!inView && animation.current) {
      animation.current.pause()
    }

    if (inView && animation.current) {
      animation.current.resume()
    }
  }, [inView])

  if (!infoBox3) return <></>

  const { title, description, image } = infoBox3

  return (
    <section
      ref={ref}
      className="relative sm:flex body-gutter-sm lg:body-gutter-lg
    xl:body-gutter-xl"
    >
      <div className="relative w-full sm:flex sm:max-h-70vh lg:w-1/2">
        {image && <ContentfulImage image={image} />}
      </div>
      <div className="relative z-10 flex items-center w-full lg:w-1/2">
        <div className="relative z-10 pt-4 sm:pt-0 sm:pl-16 xl:pl-20">
          <InfoBoxTitle>{title}</InfoBoxTitle>
          <InfoBoxText>{description} </InfoBoxText>
          <div className="flex justify-center sm:mt-0 sm:justify-start">
            <Link href="/faq#same-day">
              <a>
                <ShadowLink>Details</ShadowLink>
              </a>
            </Link>
          </div>
        </div>
        <div
          ref={shape}
          className="flex absolute top-0 left-1/2 w-full max-w-xs sm:max-h-4/5 sm:max-w-none sm:top-1/2 sm:left-auto transform -translate-x-1/2 -translate-y-1/2"
        >
          <StarOutline className="object-fit" />
        </div>
      </div>
    </section>
  )
}

export default NewInfoBox3
