import React, { FunctionComponent, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const NavLinkDesktop: FunctionComponent<Props> = ({ children }) => {
  const { navOpen } = useSelector(selectGlobal())
  const [hover, setHover] = useState<boolean>(false)
  const linkRef = useRef<null | HTMLDivElement>(null)

  return (
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
  )
}

export default NavLinkDesktop
