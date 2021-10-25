import React, { FunctionComponent, useEffect, useRef } from 'react'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { gsap } from 'gsap'

import { useDispatch, useSelector } from 'react-redux'

import ProductsTags from '@components/products-page/products-bar/ProductsTags'
import ProductCategories from '@components/products-page/products-menu/ProductCategories'
import { selectProducts, toggleMobileMenuOpen } from '@redux/productsSlice'

const MobileMenu: FunctionComponent = () => {
  const menuRef = useRef<HTMLDivElement | null>(null)

  const { mobileMenuOpen } = useSelector(selectProducts())
  const dispatch = useDispatch()

  useEffect(() => {
    if (mobileMenuOpen && menuRef.current) {
      gsap.to(menuRef.current, {
        duration: 0.2,
        marginTop: 0,
      })

      disableBodyScroll(menuRef.current)
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        clearAllBodyScrollLocks()
        dispatch(toggleMobileMenuOpen())
      },
    })

    tl.to(menuRef.current, {
      duration: 0.2,
      marginTop: '100vh',
    })
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-40 inset-0 bg-white pt-6 overflow-y-hidden mt-full
      lg:hidden flex flex-col"
    >
      <div className="body-gutter-sm">
        <ProductsTags variant="mobile" closeMobileMenu={closeMobileMenu} />
      </div>
      <div className="overflow-y-auto body-gutter-sm">
        <ProductCategories />
      </div>
    </div>
  )
}

export default MobileMenu
