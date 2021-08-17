import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { gsap } from 'gsap'
import _Draggable, { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
import ShadowButton from '@components/common/ShadowButton'
import { Direction } from '@models/hero'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const SocialGallery: FunctionComponent = () => {
  // const { igImages } = useSelector(selectSocial())
  const { locale } = useSelector(selectGlobal())
  const { categories } = useSelector(selectProducts())

  const slider = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const proxy = useRef<HTMLDivElement | null>(null)

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

  const setHeight = () => {
    const [item] = items.current

    if (!item) return

    // console.log(item.offsetHeight)

    gsap.set(slider.current, {
      height: item.offsetHeight,
    })
  }

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
  }, [animateSlides, setWidths])

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
  ])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <section className="my-24">
      <OutlineMarquee text="Shop by type" />
      <div className="overflow-hidden relative mt-12">
        {categories.length > 0 && (
          <div ref={slider} className="w-full relative">
            <ul ref={list} className="absolute inset-0 m-0 p-0">
              {categories.map((category) => (
                <li
                  key={category.id}
                  ref={(el) => items.current.push(el)}
                  className="absolute px-2 w-36 top-0 left-0 sm:px-4 sm:w-48
                lg:px-6 lg:w-64 xl:px-8 xl:w-80"
                >
                  <div className="relative flex shadow-blue-dark">
                    <img
                      className="object-cover w-full"
                      src={category.image.file[locale].url}
                      alt=""
                    />
                  </div>
                  <button
                    type="button"
                    className="block mt-3 mx-auto text-base text-center text-blue-dark
                   font-bold uppercase lg:text-lg xl:text-xl"
                  >
                    {category.title[locale]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-8 mb-12">
        <ShadowButton text="Shop all wines" />
      </div>
      <OutlineMarquee text="Shop by type" direction="-=" />
    </section>
  )
}

export default SocialGallery