import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { gsap } from 'gsap'
import { useSelector } from 'react-redux'

import SimpleBarReact from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import ProductCategories from '@components/products-page/products-menu/ProductCategories'
import { remToPixels } from '@lib/remToPixels'
import { selectProducts } from '@redux/productsSlice'

const DesktopMenu: FunctionComponent = () => {
  // const router = useRouter()
  // const dispatch = useDispatch()

  const { menuOpen } = useSelector(selectProducts())

  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [maxHeight, setMaxHeight] = useState<number>(0)

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

      if (containerBottomDistance <= menuBottomDistance) {
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

  // useEffect(() => {
  //   if (Object.values(router.query).length > 0) {
  //     const { page, ...tags } = router.query
  //
  //     dispatch(handlePage(page))
  //     dispatch(handleTags(tags))
  //   } else {
  //     dispatch(resetTags())
  //   }
  // }, [router, dispatch])

  const [margin, setMargin] = useState(0)

  const handleMargin = useCallback(() => {
    const width = containerRef?.current?.offsetWidth || 0

    if (width > 0) {
      setMargin(width)
    }
  }, [])

  useEffect(() => {
    if (window) {
      handleMargin()
      window.addEventListener('resize', handleMargin)
    }

    return () => window.removeEventListener('resize', handleMargin)
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
      className="hidden lg:block lg:pl-12 xl:pl-24 2xl:pl-32"
    >
      <div
        ref={menuRef}
        className={`fixed
        max-w-full max-h-screen pb-20 z-40 inset-0 right-0 bg-white lg:block 
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
