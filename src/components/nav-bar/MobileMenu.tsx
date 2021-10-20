import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
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
  const [isScrollUp, scrollDistance] = useScrollDetector(mobileMenuRef)

  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.scrollTo(0, 0)
    }

    gsap.set(barRef.current, {
      y: 0,
    })
  }, [barRef, mobileNavOpen])

  useEffect(() => {
    if (scrollDistance < 50 && mobileNavOpen) {
      gsap.set(barRef.current, {
        y: 0,
      })
    } else if (!isScrollUp && mobileNavOpen) {
      gsap.set(barRef.current, {
        y: '-7rem',
      })
    } else if (isScrollUp && mobileNavOpen) {
      gsap.set(barRef.current, {
        y: 0,
      })
    }
  }, [isScrollUp, scrollDistance, mobileNavOpen, barRef])

  useEffect(() => {
    if (mobileNavOpen && mobileMenuRef.current) {
      disableBodyScroll(mobileMenuRef.current)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [mobileNavOpen])

  return (
    <div
      ref={mobileMenuRef}
      className={`fixed inset-0 transform 
      transition-all duration-300 overflow-x-hidden overflow-y-auto py-20 
      bg-blue-dark lg:hidden`}
      style={{
        marginRight: mobileNavOpen ? 0 : '100%',
      }}
    >
      <div className="w-full body-gutter-sm max-w-xl mx-auto">
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
