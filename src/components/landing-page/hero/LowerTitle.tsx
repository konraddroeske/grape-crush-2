import React, { FunctionComponent } from 'react'

import AnimatedHeadline from '@components/common/AnimatedHeadline'
import HeroMarquee from '@components/landing-page/hero/HeroMarquee'

const LowerTitle: FunctionComponent = () => {
  return (
    <div className="inline-block text-white relative">
      {/* <span className="">Everyone</span> */}
      <AnimatedHeadline text="Everyone" textStyle="text-white" />
      <div className="hidden lg:block transform -translate-x-1 absolute top-full right-0">
        <div className="">
          <HeroMarquee />
        </div>
      </div>
    </div>
  )
}

export default LowerTitle
