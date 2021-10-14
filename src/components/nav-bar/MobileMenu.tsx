import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'

import MenuButtonMobile from '@components/nav-bar/MenuButtonMobile'
import MenuLink from '@components/nav-bar/MenuLink'
import NavCategories from '@components/nav-bar/NavCategories'
import NavSearch from '@components/nav-bar/NavSearch'
import useScrollDetector from '@hooks/useScrollDetector'

interface Props {
  mobileNavOpen: boolean
  barRef: RefObject<HTMLDivElement>
}

const MobileMenu: FunctionComponent<Props> = ({ mobileNavOpen, barRef }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const isScrollUp = useScrollDetector(mobileMenuRef)

  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.scrollTo(0, 0)
    }
  }, [mobileNavOpen])

  useEffect(() => {
    const duration = 1

    if (!isScrollUp && mobileNavOpen) {
      gsap.set(barRef.current, {
        y: '-7rem',
        duration,
      })
    } else if (isScrollUp && mobileNavOpen) {
      gsap.set(barRef.current, {
        y: 0,
        duration,
      })
    }
  }, [isScrollUp, mobileNavOpen, barRef])

  return (
    <div
      ref={mobileMenuRef}
      className={`fixed inset-0 transform ${
        mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
      } transition duration-300 overflow-x-hidden overflow-y-auto py-20 
      body-gutter-sm bg-blue-dark lg:hidden`}
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
