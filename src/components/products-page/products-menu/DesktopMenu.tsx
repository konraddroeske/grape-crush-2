import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { gsap } from 'gsap'
import { useRouter } from 'next/dist/client/router'

import { useSelector } from 'react-redux'

import SimpleBarReact from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import ProductCategories from '@components/products-page/products-menu/ProductCategories'
import { remToPixels } from '@lib/remToPixels'
import { selectProducts } from '@redux/productsSlice'

const DesktopMenu: FunctionComponent = () => {
  const { menuOpen } = useSelector(selectProducts())

  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [categoriesHeight, setCategoriesHeight] = useState<number>(0)

  const handleHeight = useCallback(() => {
    if (window && menuRef?.current && containerRef?.current) {
      const windowHeight = window.innerHeight

      const menuDistanceToTop = menuRef.current.getBoundingClientRect().top
      const containerDistanceTopTo =
        containerRef.current.getBoundingClientRect().top
      const pixels = remToPixels(5)

      const menuHeight = windowHeight - menuDistanceToTop

      const menuBottomDistance = menuDistanceToTop + menuHeight
      const containerBottomDistance =
        containerDistanceTopTo + containerRef.current.offsetHeight

      if (categoriesHeight < windowHeight) {
        setMaxHeight(categoriesHeight)
      } else if (containerBottomDistance <= menuBottomDistance) {
        setMaxHeight(windowHeight)
      } else {
        setMaxHeight(menuHeight)
      }

      if (menuDistanceToTop <= pixels && !isSticky) {
        setIsSticky(true)
      }

      if (menuDistanceToTop > pixels && isSticky) {
        setIsSticky(false)
      }
    }
  }, [categoriesHeight, isSticky])

  useEffect(() => {
    handleHeight()
  }, [handleHeight, router])

  useEffect(() => {
    if (window) {
      handleHeight()
      window.addEventListener('scroll', handleHeight)
    }
    return () => {
      window.removeEventListener('scroll', handleHeight)
    }
  }, [handleHeight])

  const [margin, setMargin] = useState(0)

  const handleMargin = useCallback(() => {
    const width = containerRef?.current?.offsetWidth || 0

    if (width > 0) {
      setMargin(width)
    }
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const height = entries[0].borderBoxSize[0].blockSize
      setCategoriesHeight(height)
    })

    if (window) {
      handleMargin()
      window.addEventListener('resize', handleMargin)

      const categories = document.getElementById('product-categories')

      if (categories) {
        resizeObserver.observe(categories)
      }
    }

    return () => {
      window.removeEventListener('resize', handleMargin)
      resizeObserver.disconnect()
    }
  }, [handleMargin])

  useEffect(() => {
    if (menuOpen) {
      gsap.to(containerRef.current, {
        duration: 0.3,
        marginLeft: 0,
      })
    } else {
      gsap.to(containerRef.current, {
        duration: 0.3,
        marginLeft: `-${margin}px`,
      })
    }
  }, [menuOpen, margin])

  return (
    <div
      ref={containerRef}
      className="hidden lg:block lg:pl-12 xl:pl-16 2xl:pl-16"
    >
      <div
        ref={menuRef}
        className={`fixed
        max-w-full max-h-screen z-40 inset-0 right-0 bg-white lg:block 
        ${isSticky ? 'lg:sticky lg:top-20' : 'lg:static'} lg:px-0 lg:z-20`}
      >
        <SimpleBarReact
          className="max-h-full pt-8 body-gutter-sm lg:w-64 lg:p-0 lg:pr-6"
          style={{
            height: maxHeight,
          }}
        >
          <ProductCategories />
        </SimpleBarReact>
      </div>
    </div>
  )
}

export default DesktopMenu
