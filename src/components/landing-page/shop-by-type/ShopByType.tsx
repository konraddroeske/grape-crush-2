import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { gsap } from 'gsap'
import _Draggable, { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import OutlineMarquee from '@components/common/OutlineMarquee'
import ShadowLink from '@components/common/ShadowLink'
import { Direction } from '@models/misc'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const SocialGallery: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { categories } = useSelector(selectProducts())

  const slider = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const proxy = useRef<HTMLDivElement | null>(null)
  const height = useRef<number>(0)

  // const reorderedSlides =
  //   igImages.length % 2 === 0
  //     ? [...igImages.slice(-1), ...igImages.slice(0, -1)]
  //     : [...igImages.slice(-1), ...igImages.slice(0, -2)]
  //
  // const count = useRef(reorderedSlides.length)
  const count = useRef(categories.length)

  const itemWidth = useRef(0)
  const wrapWidth = useRef(0)
  const animation = useRef<gsap.core.Tween | null>(null)

  const [draggable, setDraggable] = useState<_Draggable | null>(null)

  const timer = useRef<gsap.core.Tween | null>(null)
  const slideDuration = useRef(1)

  const slideAnimation = useRef(
    gsap.to(
      {},
      {
        duration: 0.1,
      }
    )
  )

  // console.log('component', igImages)

  const setPosition = useCallback(() => {
    items.current.forEach((item, i) =>
      gsap.set(item, {
        xPercent: i * 100,
      })
    )
  }, [])

  const updateProgress = () => {
    if (!animation.current) return
    animation.current.progress(
      gsap.utils.wrap(
        0,
        1,
        Number(gsap.getProperty(proxy.current, 'x')) / wrapWidth.current
      )
    )
  }

  const updateAnimation = useCallback(() => {
    animation.current = gsap.to(items.current, {
      duration: 1,
      xPercent: `+=${count.current * 100}`,
      ease: 'none',
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-100, (count.current - 1) * 100),
      },
    })
  }, [])

  const snapX = (x: number) => {
    return Math.round(x / itemWidth.current) * itemWidth.current
  }

  const animateSlides = useCallback(
    (direction: Direction) => {
      if (draggable && draggable.isThrowing) {
        draggable.tween.kill()
      }

      if (timer.current) {
        timer.current.restart(true)
      }

      slideAnimation.current.kill()

      const xVal = snapX(
        Number(gsap.getProperty(proxy.current, 'x')) +
          direction * itemWidth.current
      )

      slideAnimation.current = gsap.to(proxy.current, {
        duration: slideDuration.current,
        x: xVal,
        onUpdate: updateProgress,
      })
    },
    [draggable]
  )

  const setWidths = useCallback(() => {
    const [item] = items.current
    if (!item) return
    itemWidth.current = item.offsetWidth
    wrapWidth.current = itemWidth.current * count.current
  }, [])

  const setHeight = useCallback(() => {
    const [item] = items.current

    if (!item || height.current === item.offsetHeight) return

    height.current = item.offsetHeight

    gsap.set(slider.current, {
      height: item.offsetHeight,
    })
  }, [])

  const handleResize = useCallback(() => {
    const norm =
      Number(gsap.getProperty(proxy.current, 'x')) / wrapWidth.current || 0
    setWidths()
    setHeight()
    gsap.set(proxy.current, {
      x: norm * wrapWidth.current,
    })
    animateSlides(0)
    slideAnimation.current.progress(1)
  }, [setHeight, animateSlides, setWidths])

  const handleSnap = useCallback((x: number) => {
    return gsap.utils.snap(itemWidth.current)(x)
  }, [])

  const initDraggable = useCallback(() => {
    const instance = new Draggable(proxy.current, {
      type: 'x',
      trigger: list.current,
      throwProps: true,
      onPress() {
        slideAnimation.current.kill()
        // eslint-disable-next-line react/no-this-in-sfc
        this.update()
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: handleSnap,
      },
    })

    setDraggable(instance)
  }, [handleSnap])

  useEffect(() => {
    if (!draggable) {
      gsap.registerPlugin(Draggable, InertiaPlugin)
      proxy.current = document.createElement('div')
      gsap.set(proxy.current, {
        x: 0,
      })
      setWidths()
      setHeight()
      setPosition()
      initDraggable()
      updateAnimation()
    }
  }, [
    draggable,
    initDraggable,
    handleResize,
    setPosition,
    updateAnimation,
    setWidths,
    setHeight,
  ])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <section className="section-margin">
      <OutlineMarquee text="Shop by type" />
      <div className="overflow-hidden relative mt-12 lg:mt-20">
        {categories.length > 0 && (
          <div ref={slider} className="w-full relative">
            <ul ref={list} className="absolute inset-0 m-0 p-0">
              {categories.map((category) => {
                return (
                  <li
                    key={category.categoryName[locale]}
                    ref={(el) => items.current.push(el)}
                    className="absolute px-2 w-60 top-0 left-0 sm:px-4 sm:w-72
                  lg:px-6 lg:w-80 xl:px-8 xl:w-88"
                  >
                    <div className="relative flex shadow-blue-dark">
                      {category.image && (
                        <ContentfulImage image={category.image} />
                      )}
                    </div>
                    <button
                      type="button"
                      className="block mt-3 mx-auto text-lg xl:text-xl text-center text-blue-dark
                     font-bold uppercase lg:text-lg xl:text-xl"
                    >
                      <Link
                        href={`/products?parentType=${encodeURIComponent(
                          category.categoryName[locale]
                        )}`}
                      >
                        <a>{category.title[locale]}</a>
                      </Link>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-8 mb-12 lg:mb-20">
        <Link href="/products">
          <a>
            <ShadowLink>Shop all wines</ShadowLink>
          </a>
        </Link>
      </div>
      <OutlineMarquee text="Shop by type" direction="-=" />
    </section>
  )
}

export default SocialGallery
