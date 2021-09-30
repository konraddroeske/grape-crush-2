import React, { FunctionComponent, useRef, useState } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'

interface MenuLinkProps {
  children: React.ReactNode
  to: string
  variant: 'mobile' | 'desktop'
}

const MenuLink: FunctionComponent<MenuLinkProps> = ({
  children,
  variant,
  to,
}) => {
  const { navOpen } = useSelector(selectGlobal())
  // const { currentTheme } = useSelector(selectHero())
  const linkRef = useRef<null | HTMLDivElement>(null)

  const [hover, setHover] = useState<boolean>(false)

  return (
    <>
      {variant === 'desktop' ? (
        <Link href={to}>
          <a>
            <div
              className="overflow-hidden font-bold uppercase text-xl mx-4 xl:mx-6"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <div
                ref={linkRef}
                className={`h-10 transition-all duration-300 ${
                  hover ? 'transform -translate-y-full' : ''
                }`}
              >
                <div
                  className={`${
                    navOpen ? 'text-white' : 'text-blue-dark'
                  } h-10 flex items-center`}
                >
                  {children}
                </div>
                <div
                  className={`${
                    navOpen ? 'text-white' : 'text-blue-dark'
                  } h-10 flex items-center`}
                >
                  {children}
                </div>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <Link href={to}>
          <a>
            <div
              className={`${
                navOpen ? 'text-white' : 'text-dark-blue'
              } transition-all duration-150 uppercase font-bold text-4xl h-auto 
              mr-0 mb-4 sm:mb-5 sm:text-5xl xl:mr-0`}
            >
              {children}
            </div>
          </a>
        </Link>
      )}
    </>
  )
}

export default MenuLink
