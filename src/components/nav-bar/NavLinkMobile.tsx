import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const NavLinkMobile: FunctionComponent<Props> = ({ children }) => {
  const { navOpen } = useSelector(selectGlobal())

  return (
    <div
      className={`${
        navOpen ? 'text-white' : 'text-dark-blue'
      } transition-all duration-150 uppercase font-bold text-4xl h-auto 
              mr-0 mb-4 sm:mb-5 sm:text-5xl xl:mr-0`}
    >
      {children}
    </div>
  )
}

export default NavLinkMobile
