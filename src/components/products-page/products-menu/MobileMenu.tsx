import React, { FunctionComponent, useEffect, useRef } from 'react'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { gsap } from 'gsap'

import { useDispatch, useSelector } from 'react-redux'

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
    } else {
      clearAllBodyScrollLocks()
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => {
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
      className="fixed z-40 inset-0 bg-white pt-6 body-gutter-sm overflow-y-auto mt-full
      lg:hidden"
    >
      <ProductCategories closeMobileMenu={closeMobileMenu} />
    </div>
  )
}

export default MobileMenu
