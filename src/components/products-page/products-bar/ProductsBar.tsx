import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useSelector } from 'react-redux'

import { useMediaQuery } from 'react-responsive'

import MenuToggle from '@components/products-page/products-bar/MenuToggle'
import ProductsBreadcrumbs from '@components/products-page/products-bar/ProductsBreadcrumbs'
import ProductsSearch from '@components/products-page/products-bar/ProductsSearch'
import ProductsSort from '@components/products-page/products-bar/ProductsSort'
import useScrollDetector from '@hooks/useScrollDetector'
import { remToPixels } from '@lib/remToPixels'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const ProductsBar: FunctionComponent = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const { menuOpen, mobileMenuOpen } = useSelector(selectProducts())
  const { mobileNavOpen } = useSelector(selectGlobal())
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [isExpand, setIsExpand] = useState<boolean>(false)

  const outerRef = useRef<null | HTMLDivElement>(null)
  const innerRef = useRef<null | HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (window && outerRef.current && innerRef.current) {
      const distanceToTop = outerRef.current.getBoundingClientRect().top

      // console.log('distance to top', distanceToTop)
      const distance = remToPixels(4)

      if (distanceToTop <= 0 && !isSticky) {
        setIsSticky(true)
      }

      if (distanceToTop > distance && isSticky) {
        setIsSticky(false)
      }
    }
  }, [isSticky])

  useEffect(() => {
    if (window && !isDesktop) {
      window.addEventListener('scroll', handleScroll)
    }

    if (isDesktop) {
      window.removeEventListener('scroll', handleScroll)
      setIsSticky(false)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, isDesktop])

  const [isScrollUp, scrollDistance] = useScrollDetector()

  useEffect(() => {
    if (isDesktop) {
      setIsExpand(false)
    } else if (!isSticky) {
      setIsExpand(false)
    } else if (isSticky && !isScrollUp && !isDesktop && !mobileNavOpen) {
      setIsExpand(false)
    } else if (isSticky && isScrollUp && !isDesktop && !mobileNavOpen) {
      setIsExpand(true)
    }
  }, [isSticky, isScrollUp, scrollDistance, isDesktop, mobileNavOpen])

  return (
    <div ref={outerRef} className="h-12 border-t border-blue-dark">
      <div
        ref={innerRef}
        className={`${
          isSticky && !isDesktop
            ? 'fixed top-0 left-0 right-0 duration-700'
            : 'relative duration-0'
        } flex items-end z-10 bg-white ${isExpand ? 'h-28' : 'h-12'}
        transition-height`}
      >
        <div
          className="h-12 flex w-full items-center border-b border-blue-dark
        body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl"
        >
          <div className="hidden lg:flex items-center mr-auto">
            <ProductsBreadcrumbs />
          </div>
          <div className="flex w-full items-center lg:w-auto">
            <div className="flex mr-2 lg:mr-0">
              <div className="hidden lg:block mr-3 lg:mr-6">
                <MenuToggle type="desktop" menuOpen={menuOpen} />
              </div>
              <div className="lg:hidden mr-3 lg:mr-6">
                <MenuToggle type="mobile" menuOpen={mobileMenuOpen} />
              </div>
              <div className="mr-3 lg:mr-6">
                <ProductsSort />
              </div>
            </div>
            <div className="ml-auto lg:ml-0">
              <ProductsSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsBar
