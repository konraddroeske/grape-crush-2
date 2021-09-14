import React, { FunctionComponent } from 'react'

import FooterPageLink from '@components/footer/FooterPageLink'

import OvalOutline from '../../assets/svgs/oval-outline.svg'
import RectangleOutline from '../../assets/svgs/rectangle-outline.svg'
import RippleOutline from '../../assets/svgs/ripple-outline.svg'

const FooterNav: FunctionComponent = () => {
  return (
    <div
      className="relative z-10 flex flex-col sm:flex-row justify-between py-6 lg:py-20 body-gutter-sm
    md:flex-nowrap lg:body-gutter-lg xl:body-gutter-xl"
    >
      <FooterPageLink text="Shop" to="/products">
        <OvalOutline
          className="absolute w-36 lg:w-44 xl:w-52 top-1/2 left-1/2 transform
           -translate-y-1/2 -translate-x-1/2"
        />
      </FooterPageLink>
      <FooterPageLink text="Contact" to="/">
        <RectangleOutline
          className="absolute w-36 lg:w-44 xl:w-52 top-1/2 left-1/2 transform
          -translate-y-1/2 -translate-x-1/2"
        />
      </FooterPageLink>
      <FooterPageLink text="About" to="/">
        <RippleOutline
          className="absolute w-36 lg:w-44 xl:w-52 top-1/2 left-1/2 transform
        -translate-y-1/2 -translate-x-1/2"
        />
      </FooterPageLink>
    </div>
  )
}

export default FooterNav