import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import AboutWave from '@assets/svgs/about-wave.svg'
import ContactWave from '@assets/svgs/contact-wave.svg'
import ShopWave from '@assets/svgs/shop-wave.svg'

const FooterTop: FunctionComponent = () => {
  return (
    <>
      <div className="relative flex justify-center items-center text-3xl my-12 pointer-events-none">
        <div className="z-10 font-bold uppercase pointer-events-auto">
          <Link href="/">Shop</Link>
        </div>
        <div className="absolute top-9/10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-footer w-full">
          <ShopWave className="w-full" />
        </div>
      </div>
      <div className="z-10 relative flex justify-center items-center text-3xl my-12 pointer-events-none">
        <div className="z-10 font-bold uppercase pointer-events-auto">
          <Link href="/">About</Link>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-footer w-full">
          <AboutWave className="w-full" />
        </div>
      </div>
      <div className="z-20 relative flex justify-center items-center text-3xl my-12 pointer-events-none">
        <div className="z-10 font-bold uppercase text-white pointer-events-auto">
          <Link href="/">Contact</Link>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-footer w-full">
          <ContactWave className="w-full" />
        </div>
      </div>
    </>
  )
}

export default FooterTop
