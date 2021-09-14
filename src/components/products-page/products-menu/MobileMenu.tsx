import React, { FunctionComponent, useEffect, useRef } from 'react'

import { gsap } from 'gsap'

import { useDispatch } from 'react-redux'

import ProductCategories from '@components/products-page/products-menu/ProductCategories'
import { toggleMobileMenuOpen } from '@redux/productsSlice'

const MobileMenu: FunctionComponent = () => {
  // const { mobileMenuOpen } = useSelector(selectProducts())
  const menuRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  // const [marginHeight, setMarginHeight] = useState<number>(0)

  // useEffect(() => {
  //   const height = menuRef?.current?.offsetHeight || 0
  //   setMarginHeight(height)
  // }, [])

  useEffect(() => {
    gsap.to(menuRef.current, {
      duration: 0.3,
      marginTop: 0,
    })
  }, [])

  const closeMobileMenu = () => {
    if (window) {
      const tl = gsap.timeline({
        onComplete: () => {
          dispatch(toggleMobileMenuOpen())
        },
      })

      tl.to(menuRef.current, {
        duration: 0.3,
        marginTop: window.innerHeight,
      })
    }
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-40 inset-0 bg-white pt-6 body-gutter-sm overflow-auto
      lg:hidden"
      style={{
        marginTop: window ? window.innerHeight : 0,
      }}
    >
      <ProductCategories closeMobileMenu={closeMobileMenu} />
    </div>
  )
}

export default MobileMenu
