import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import FbLogo from '@assets/svgs/facebook.svg'
import FooterWave from '@assets/svgs/footer-wave.svg'
import IgLogo from '@assets/svgs/instagram.svg'
import FooterTop from '@components/footer/FooterTop'
import { selectGlobal } from '@redux/globalSlice'

export const FooterTitle: FunctionComponent = ({ children }) => (
  <h4
    className="text-base font-bold center text-blue text-center uppercase leading-tight
            md:text-left"
  >
    {children}
  </h4>
)

export const FooterLink: FunctionComponent = (props) => (
  <li className="md:mr-4 lg:mr-6 lg:text-sm" {...props} />
)

export const LogoContainer: FunctionComponent = (props) => (
  <div className="w-8 mr-2 md:flex md:items-center" {...props} />
)

const Footer: FunctionComponent = () => {
  const { helpPages, legalPages, locale } = useSelector(selectGlobal())
  return (
    <footer className="overflow-x-hidden">
      <FooterTop />
      <div className="relative z-30 mt-16 bg-gray-light xl:mt-20">
        <div className="flex flex-wrap body-gutter-sm relative z-10 md:flex-nowrap md:py-6">
          <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2
          translate-y-1/3 min-w-footer w-full"
          >
            <FooterWave className="w-full" />
          </div>
          <div className="w-1/2 pr-1 md:w-auto md:flex-grow z-10">
            <FooterTitle>Help</FooterTitle>
            <ul className="font-normal text-xs text-center mt-1 leading-5 md:flex">
              <FooterLink>Contact</FooterLink>
              <FooterLink>Location & Hours</FooterLink>
              {helpPages.map((page) => {
                return (
                  <FooterLink key={page.slug[locale]}>
                    {page.title[locale]}
                  </FooterLink>
                )
              })}
            </ul>
          </div>
          <div className="w-1/2 pl-1 md:w-auto md:flex-grow z-10">
            <FooterTitle>Legal Info</FooterTitle>
            <ul className="font-normal text-xs text-center mt-1 leading-5 md:flex">
              {legalPages.map((page) => {
                return (
                  <FooterLink key={page.slug[locale]}>
                    {page.title[locale]}
                  </FooterLink>
                )
              })}
            </ul>
          </div>
          <div
            className="flex flex-grow justify-center py-8 bg-gray-light md:py-0 md:justify-end
          md:flex-grow-0"
          >
            <LogoContainer>
              <IgLogo />
            </LogoContainer>
            <LogoContainer>
              <FbLogo />
            </LogoContainer>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
