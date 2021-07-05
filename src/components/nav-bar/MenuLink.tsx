import React, { FunctionComponent } from 'react'

import Link from 'next/link'

interface MenuLinkProps {
  children: React.ReactNode
  variant: 'mobile' | 'desktop'
}

const MenuLink: FunctionComponent<MenuLinkProps> = ({ children, variant }) => {
  const variants = {
    mobile: 'text-4xl h-auto mr-0 mb-4 xl:mr-0',
    desktop: 'text-xl h-16 mx-4 xl:mx-6',
  }
  return (
    <div
      className={`flex items-center ${variants[variant]} font-bold uppercase `}
    >
      <Link href="/">{children}</Link>
    </div>
  )
}

export default MenuLink
