import React, { FunctionComponent } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import FbLogo from '@assets/svgs/facebook.svg'
import IgLogo from '@assets/svgs/instagram.svg'

import FooterLogo from '@components/footer/FooterLogo'
import { selectGlobal } from '@redux/globalSlice'

export const FooterTitle: FunctionComponent = ({ children }) => (
  <h4
    className="text-base font-bold center text-white text-center uppercase leading-tight
            lg:text-left xl:leading-7 md:text-lg"
  >
    {children}
  </h4>
)

interface FooterLinkProps {
  to: string
}

export const FooterLink: FunctionComponent<FooterLinkProps> = ({
  children,
  to,
}) => (
  <div className="py-1 text-sm lg:mr-6 md:text-base xl:mr-0 xl:leading-7 hover:text-lime">
    <Link href={to}>
      <a>{children}</a>
    </Link>
  </div>
)

export const LogoContainer: FunctionComponent = ({ children }) => (
  <div className="w-8 mx-3 lg:mx-0 lg:ml-6 lg:flex lg:items-center xl:ml-0 xl:mr-6">
    {children}
  </div>
)

const FooterInfo: FunctionComponent = () => {
  const { legalPages } = useSelector(selectGlobal())
  return (
    <div className="relative z-20 bg-blue-dark xl:flex xl:overflow-hidden">
      <FooterLogo />
      <div
        className="flex flex-wrap pt-4 sm:py-6 lg:py-8 body-gutter-sm
        lg:body-gutter-lg xl:w-6/12 xl:items-center xl:pl-1/8 xl:pr-0 xl:pt-16"
      >
        <div
          className="w-1/2 pr-1 lg:w-auto lg:flex-grow z-10 xl:w-1/2
        xl:flex-grow-0 xl:pr-0"
        >
          <FooterTitle>Help</FooterTitle>
          <ul
            className="font-normal text-xs sm:text-sm text-white text-center mt-1 leading-5
          lg:flex xl:block xl:text-left"
          >
            <li>
              <FooterLink to="/contact#contact-email">Contact</FooterLink>
            </li>
            <li>
              <FooterLink to="/contact#contact-location">
                Location & Hours
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/faq">Faq</FooterLink>
            </li>
          </ul>
        </div>
        <div
          className="w-1/2 pl-1 lg:w-auto lg:flex-grow z-10 xl:w-1/2
        xl:flex-grow-0 xl:pl-0"
        >
          <FooterTitle>Legal Info</FooterTitle>
          <ul
            className="font-normal text-xs sm:text-sm text-white text-center mt-1 leading-5
          lg:flex xl:block xl:text-left"
          >
            {legalPages.map((page) => {
              return (
                <li key={page.title}>
                  <FooterLink to={`/legal/${page.slug}`}>
                    {page.title}
                  </FooterLink>
                </li>
              )
            })}
          </ul>
        </div>
        <div
          className="flex flex-grow justify-center py-8 lg:py-0 lg:justify-end
          lg:flex-grow-0 sm:pb-0 xl:py-0 xl:ml-1/2"
        >
          <LogoContainer>
            <a
              href="https://www.instagram.com/grapecrush.wine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IgLogo className="w-full hover:svg-lime-fill" />
              <span className="sr-only">Instagram</span>
            </a>
          </LogoContainer>
          <LogoContainer>
            <a
              href="https://www.facebook.com/grapecrush.wine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FbLogo className="w-full hover:svg-lime-fill" />
              <span className="sr-only">Facebook</span>
            </a>
          </LogoContainer>
        </div>
      </div>
    </div>
  )
}

export default FooterInfo
