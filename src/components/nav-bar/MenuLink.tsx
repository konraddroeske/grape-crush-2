import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import NavLinkDesktop from '@components/nav-bar/NavLinkDesktop'
import NavLinkMobile from '@components/nav-bar/NavLinkMobile'

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
  return (
    <>
      {variant === 'desktop' ? (
        <Link href={to}>
          <a>
            <NavLinkDesktop>{children}</NavLinkDesktop>
          </a>
        </Link>
      ) : (
        <Link href={to}>
          <a>
            <NavLinkMobile>{children}</NavLinkMobile>
          </a>
        </Link>
      )}
    </>
  )
}

export default MenuLink
