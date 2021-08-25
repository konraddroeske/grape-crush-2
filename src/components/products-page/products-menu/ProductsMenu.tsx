import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import SimpleBarReact from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import Category from '@components/products-page/products-menu/Category'
import { remToPixels } from '@lib/remToPixels'
import { selectGlobal } from '@redux/globalSlice'
import {
  handlePage,
  handleTags,
  resetTags,
  selectProducts,
} from '@redux/productsSlice'

const ProductsMenu: FunctionComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { locale } = useSelector(selectGlobal())
  const { allTags } = useSelector(selectProducts())
  const { menuOpen } = useSelector(selectProducts())

  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [parentTypeOptions, setParentTypeOptions] = useState<string[]>([])
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const [typeOptions, setTypeOptions] = useState<string[]>([])
  const [styleOptions, setStyleOptions] = useState<string[]>([])
  const [countryOptions, setCountryOptions] = useState<string[]>([])
  const [varietalOptions, setVarietalOptions] = useState<string[]>([])
  const [priceRangeOptions, setPriceRangeOptions] = useState<string[]>([])

  const sortTags = (tags: Record<string, number>) => {
    const sortedByQuantity = Object.entries(tags)
      .sort((a, b) => {
        return b[1] - a[1]
      })
      .map((tag) => tag[0])

    const mostPopular =
      sortedByQuantity.length > 14
        ? sortedByQuantity.slice(0, 14)
        : sortedByQuantity

    return mostPopular.sort()
  }

  const sortPriceRange = (tags: Record<string, number>) => {
    const ranges = Object.keys(tags).sort()

    return ranges.slice(-1).concat(ranges.slice(0, -1))
  }

  useEffect(() => {
    if (allTags) {
      const { parentType, category, type, country, style, varietal, range } =
        allTags

      const sortedParentType = sortTags(parentType)
      const sortedCategory = sortTags(category)
      const sortedType = sortTags(type)
      const sortedCountry = sortTags(country)
      const sortedStyle = sortTags(style)
      const sortedVarietal = sortTags(varietal)
      const sortedPriceRange = sortPriceRange(range)

      setParentTypeOptions(sortedParentType)
      setCategoryOptions(sortedCategory)
      setTypeOptions(sortedType)
      setCountryOptions(sortedCountry)
      setStyleOptions(sortedStyle)
      setVarietalOptions(sortedVarietal)
      setPriceRangeOptions(sortedPriceRange)
    }
  }, [allTags, locale])

  const handleHeight = useCallback(() => {
    if (window && menuRef?.current) {
      const windowHeight = window.innerHeight
      const distanceToTop = menuRef.current.getBoundingClientRect().top
      const pixels = remToPixels(4)

      const height = windowHeight - distanceToTop
      setMaxHeight(height)

      if (distanceToTop <= pixels && !isSticky) {
        setIsSticky(true)
      }

      if (distanceToTop > pixels && isSticky) {
        setIsSticky(false)
      }
    }
  }, [isSticky])

  useEffect(() => {
    if (window) {
      handleHeight()
      window.addEventListener('scroll', handleHeight)
    }
    return () => {
      window.removeEventListener('scroll', handleHeight)
    }
  }, [handleHeight])

  useEffect(() => {
    if (Object.values(router.query).length > 0) {
      const { page, ...tags } = router.query

      dispatch(handlePage(page))
      dispatch(handleTags(tags))
    } else {
      dispatch(resetTags())
    }
  }, [router, dispatch])

  const handleClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (open && menuRef.current) {
      disableBodyScroll(menuRef.current)
      setMaxHeight(window.innerHeight)
    }

    if (!open && menuRef.current) {
      clearAllBodyScrollLocks()
    }
  }, [open])

  useEffect(() => {
    const width = containerRef?.current?.offsetWidth

    if (!menuOpen && width) {
      gsap.to(containerRef.current, {
        marginLeft: -width,
      })
    }

    if (menuOpen) {
      gsap.to(containerRef.current, {
        marginLeft: 0,
      })
    }
  }, [menuOpen])

  return (
    <div ref={containerRef} className="sm:pl-6 lg:pl-12 xl:pl-24 2xl:pl-32">
      <div
        ref={menuRef}
        className={`${open ? 'fixed' : 'hidden'} 
        max-w-full max-h-screen pb-20 z-40 inset-0 right-0 bg-white lg:block 
        ${isSticky ? 'lg:sticky lg:top-16' : 'lg:static'} lg:px-0 lg:z-20`}
      >
        <SimpleBarReact
          className="max-h-full pt-8 body-gutter-sm lg:w-64 lg:p-0 lg:pr-6"
          style={{
            height: maxHeight,
          }}
        >
          <Category
            title="Type"
            category="parentType"
            tags={parentTypeOptions}
          />
          <Category
            title="Category"
            category="category"
            tags={categoryOptions}
          />
          <Category title="Featured" category="type" tags={typeOptions} />
          <Category title="Style" category="style" tags={styleOptions} />
          <Category
            title="Price Range"
            category="range"
            tags={priceRangeOptions}
          />
          <Category
            title="Varietal"
            category="varietal"
            tags={varietalOptions}
          />
          <Category title="Country" category="country" tags={countryOptions} />
        </SimpleBarReact>
      </div>
      <button
        type="button"
        className="fixed z-50 left-4 bottom-4 py-2 px-4 rounded-2xl uppercase
        font-bold bg-lime lg:hidden"
        onClick={() => handleClick()}
      >
        Filter
      </button>
    </div>
  )
}

export default ProductsMenu
