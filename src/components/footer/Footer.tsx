import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import { useSelector } from 'react-redux'

import AboutWave from '@assets/svgs/about-wave.svg'
import ContactWave from '@assets/svgs/contact-wave.svg'
import FbLogo from '@assets/svgs/facebook.svg'
import FooterWave from '@assets/svgs/footer-wave.svg'
import IgLogo from '@assets/svgs/instagram.svg'
import ShopWave from '@assets/svgs/shop-wave.svg'
import { selectGlobal } from '@redux/globalSlice'

const Footer: FunctionComponent = () => {
  const { helpPages, legalPages, locale } = useSelector(selectGlobal())
  return (
    <footer>
      <div className="relative flex justify-center items-center text-3xl my-12 pointer-events-none">
        <div className="z-10 font-bold uppercase pointer-events-auto">
          <Link href="/">Shop</Link>
        </div>
        <div className="absolute top-9/10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-width-full">
          <ShopWave />
        </div>
      </div>
      <div className="z-10 relative flex justify-center items-center text-3xl my-12 pointer-events-none">
        <div className="z-10 font-bold uppercase pointer-events-auto">
          <Link href="/">About</Link>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AboutWave />
        </div>
      </div>
      <div className="z-20 relative flex justify-center items-center text-3xl my-12 pointer-events-none">
        <div className="z-10 font-bold uppercase text-white pointer-events-auto">
          <Link href="/">Contact</Link>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ContactWave />
        </div>
      </div>
      <div className="relative z-30 mt-16 bg-gray-light">
        <div className="absolute bottom-2/3 left-1/2 transform -translate-x-1/2">
          <FooterWave />
        </div>
        <div className="flex body-gutter-s relative z-10">
          <div className="flex-grow pr-1">
            <h4 className="text-base font-bold center text-blue text-center uppercase leading-tight">
              Help
            </h4>
            <ul className="font-normal text-xs text-center mt-1 leading-5">
              <li>Contact</li>
              <li>Location & Hours</li>
              {helpPages.map((page) => {
                return <li key={page.slug[locale]}>{page.title[locale]}</li>
              })}
            </ul>
          </div>
          <div className="flex-grow pl-1">
            <h4 className="text-base font-bold center text-blue text-center uppercase leading-tight">
              Legal Info
            </h4>
            <ul className="font-normal text-xs text-center mt-1 leading-5">
              {legalPages.map((page) => {
                return <li key={page.slug[locale]}>{page.title[locale]}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-8 bg-gray-light">
        <div className="w-8 mr-2">
          <IgLogo />
        </div>
        <div className="w-8 ml-2">
          <FbLogo />
        </div>
      </div>
    </footer>
  )
}

export default Footer
