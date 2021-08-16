import React, { FunctionComponent } from 'react'

import HeroMarquee from '@components/landing-page/hero/HeroMarquee'

import Swirl from '../../../assets/svgs/swirl.svg'

const LowerTitle: FunctionComponent = () => {
  return (
    <div className="inline-block text-white relative">
      <span className="text-9xl leading-30">Everyone</span>
      <div className="h-0 transform -translate-x-1 absolute top-full right-0">
        <HeroMarquee />
        <Swirl className="pointer-events-none absolute top-3 -right-40 w-188" />
      </div>
    </div>
  )
}

export default LowerTitle
