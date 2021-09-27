import React, { FunctionComponent } from 'react'

import HeroMarquee from '@components/landing-page/hero/HeroMarquee'

const LowerTitle: FunctionComponent = () => {
  return (
    <div className="inline-block text-white relative">
      <span className="">Everyone</span>
      {/* <div */}
      {/*  id="mobile-swirl" */}
      {/*  className="absolute top-full right-0 lg:hidden w-52 sm:w-68" */}
      {/* > */}
      {/*  <MobileSwirl className="pointer-events-none w-68 sm:w-88" /> */}
      {/* </div> */}
      <div className="hidden lg:block transform -translate-x-1 absolute top-full right-0">
        <div className="">
          <HeroMarquee />
        </div>
        {/* <div */}
        {/*  id="desktop-swirl" */}
        {/*  className="pointer-events-none absolute top-3 swirl-size" */}
        {/* > */}
        {/*  <Swirl className="w-full" /> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default LowerTitle
