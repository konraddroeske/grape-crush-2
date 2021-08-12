import React, { FunctionComponent } from 'react'

import AlternatingTitle from '@components/landing-page/hero/AlternatingTitle'
import LowerTitle from '@components/landing-page/hero/LowerTitle'

const HeroTitle: FunctionComponent = () => {
  return (
    <div>
      <h1 className="uppercase font-bold flex flex-col">
        <AlternatingTitle />
        <span className="leading-30 text-white text-9xl">Wines For</span>
        <div className="">
          <LowerTitle />
        </div>
      </h1>
    </div>
  )
}

export default HeroTitle
