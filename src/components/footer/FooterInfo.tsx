import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import FbLogo from '@assets/svgs/facebook.svg'
import IgLogo from '@assets/svgs/instagram.svg'

import FooterLogo from '@components/footer/FooterLogo'
import { selectGlobal } from '@redux/globalSlice'

export const FooterTitle: FunctionComponent = ({ children }) => (
  <h4
    className="text-base font-bold center text-white text-center uppercase leading-tight
            md:text-left xl:leading-7 lg:text-lg"
  >
    {children}
  </h4>
)

export const FooterLink: FunctionComponent = (props) => (
  <li className="md:mr-4 lg:mr-6 lg:text-sm xl:mr-0 xl:leading-7" {...props} />
)

export const LogoContainer: FunctionComponent = (props) => (
  <div className="w-8 mr-2 md:flex md:items-center xl:mr-4" {...props} />
)

const FooterInfo: FunctionComponent = () => {
  const { helpPages, legalPages, locale } = useSelector(selectGlobal())
  return (
    <div className="relative z-30 bg-blue-dark xl:flex xl:overflow-hidden">
      <FooterLogo />
      <div
        className="flex flex-wrap sm:py-6 lg:py-8 sm:body-gutter-sm
        lg:body-gutter-lg xl:w-6/12 xl:items-center xl:pl-1/8 xl:pr-0 xl:pt-16"
      >
        <div
          className="w-1/2 pr-1 md:w-auto md:flex-grow z-10 xl:w-1/2
        xl:flex-grow-0 xl:pr-0"
        >
          <FooterTitle>Help</FooterTitle>
          <ul
            className="font-normal text-xs text-white text-center mt-1 leading-5
          md:flex xl:block xl:text-left"
          >
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
        <div
          className="w-1/2 pl-1 md:w-auto md:flex-grow z-10 xl:w-1/2
        xl:flex-grow-0 xl:pl-0"
        >
          <FooterTitle>Legal Info</FooterTitle>
          <ul
            className="font-normal text-xs text-white text-center mt-1 leading-5
          md:flex xl:block xl:text-left"
          >
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
          className="flex flex-grow justify-center py-8 md:py-0 md:justify-end
          md:flex-grow-0 xl:py-0 xl:ml-1/2"
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
  )
}

export default FooterInfo
