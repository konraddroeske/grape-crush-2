import React, { FunctionComponent } from 'react'

import Link from 'next/link'

interface OwnProps {
  children: React.ReactNode
  text: string
}

type Props = OwnProps

const FooterPageLink: FunctionComponent<Props> = ({ children, text }) => {
  return (
    <div className="relative cursor-pointer my-10 lg:my-0">
      <Link href="/">
        <div>
          <div className="cursor-pointer text-center">
            <span
              className="relative z-10 uppercase text-5xl lg:text-6xl xl:text-7xl
            text-blue-dark font-bold"
            >
              {text}
            </span>
          </div>
          {children}
        </div>
      </Link>
    </div>
  )
}

export default FooterPageLink
