import React, { FunctionComponent } from 'react'

import AlternatingTitle from '@components/landing-page/hero/AlternatingTitle'
import LowerTitle from '@components/landing-page/hero/LowerTitle'

const HeroTitle: FunctionComponent = () => {
  return (
    <div>
      <h1 className="text-5xl sm:text-7xl lg:text-9xl lg:leading-30 uppercase font-bold flex flex-col text-center lg:text-left">
        <AlternatingTitle />
        <div className="flex flex-col lg:flex-row">
          <span className="text-white">Wines</span>
          <span className="hidden lg:block">&nbsp;</span>
          <span className="text-white">For</span>
        </div>
        <div className="">
          <LowerTitle />
        </div>
      </h1>
    </div>
  )
}

export default HeroTitle
