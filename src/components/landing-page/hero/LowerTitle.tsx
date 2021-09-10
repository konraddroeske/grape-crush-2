import React, { FunctionComponent } from 'react'

import HeroMarquee from '@components/landing-page/hero/HeroMarquee'

import MobileSwirl from '../../../assets/svgs/mobile-swirl.svg'
import Swirl from '../../../assets/svgs/swirl.svg'

const LowerTitle: FunctionComponent = () => {
  return (
    <div className="inline-block text-white relative">
      <span className="">Everyone</span>
      <div className="absolute top-full right-0 lg:hidden w-52 sm:w-68">
        <MobileSwirl className="pointer-events-none w-68 sm:w-88" />
      </div>
      <div className="hidden lg:block transform -translate-x-1 absolute top-full right-0">
        <div className="">
          <HeroMarquee />
        </div>
        <Swirl className="pointer-events-none absolute top-3 swirl-size" />
      </div>
    </div>
  )
}

export default LowerTitle
