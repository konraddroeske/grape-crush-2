import React, { FunctionComponent } from 'react'

import { useInView } from 'react-intersection-observer'

import AnimatedHeadline from '@components/common/AnimatedHeadline'
import AlternatingTitle from '@components/landing-page/hero/AlternatingTitle'
import LowerTitle from '@components/landing-page/hero/LowerTitle'

const HeroTitle: FunctionComponent = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  })
  return (
    <div ref={ref}>
      <h1 className="title-size uppercase font-bold flex flex-col text-center lg:text-left">
        {inView ? (
          <AlternatingTitle />
        ) : (
          <span className="opacity-0">Natural</span>
        )}
        <div className="flex flex-col lg:flex-row">
          <AnimatedHeadline text="Wines" textStyle="text-white" />
          <span className="hidden lg:block">&nbsp;</span>
          <AnimatedHeadline text="For" textStyle="text-white" />
        </div>
        <div className="">
          <LowerTitle />
        </div>
      </h1>
    </div>
  )
}

export default HeroTitle
