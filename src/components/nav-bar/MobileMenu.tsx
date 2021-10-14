import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import MenuButtonMobile from '@components/nav-bar/MenuButtonMobile'
import MenuLink from '@components/nav-bar/MenuLink'
import NavCategories from '@components/nav-bar/NavCategories'
import NavSearch from '@components/nav-bar/NavSearch'

interface Props {
  mobileNavOpen: boolean
}

const MobileMenu: FunctionComponent<Props> = ({ mobileNavOpen }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(mobileMenuRef.current, {
      x: mobileNavOpen ? '0' : '-100%',
      duration: 0.3,
    })
  }, [mobileNavOpen])

  return (
    <div
      ref={mobileMenuRef}
      className="fixed inset-0 transform -translate-x-full overflow-x-hidden
      overflow-y-auto py-20 body-gutter-sm bg-blue-dark lg:hidden"
    >
      <div className="w-full max-w-xl mx-auto">
        <div className="mb-2">
          <MenuButtonMobile handleOpen={handleOpen} open={open}>
            Shop
          </MenuButtonMobile>
          {open && <NavCategories />}
          <MenuLink variant="mobile" to="/about">
            About Us
          </MenuLink>
          <MenuLink variant="mobile" to="/contact">
            Visit Us
          </MenuLink>
          <MenuLink variant="mobile" to="/faq">
            FAQ
          </MenuLink>
        </div>
        {/* <RoundedButton variant="full">Shop All Wines</RoundedButton> */}
        <NavSearch variant="mobile" />
      </div>
    </div>
  )
}

export default MobileMenu
