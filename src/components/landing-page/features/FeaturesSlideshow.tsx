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
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import SlideButtons from '@components/landing-page/features/SlideButtons'
import SpinningCircle from '@components/landing-page/features/SpinningCircle'
import { Direction } from '@models/hero'
import { selectGlobal } from '@redux/globalSlice'

const FeaturesSlideshow: FunctionComponent = () => {
  const { locale, heroSlides: slides } = useSelector(selectGlobal())
  const [circleDirection, setCircleDirection] = useState<Direction>(-1)

  const useTimer = false
  const slider = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const titles = useRef<(HTMLDivElement | null)[]>([])
  const proxy = useRef<HTMLDivElement | null>(null)
  const prevPosition = useRef<number>(0)

  const reorderedSlides = [...slides.slice(-1), ...slides.slice(0, -1)]
  const count = useRef(slides.length)

  const itemWidth = useRef(0)
  const wrapWidth = useRef(0)
  const animation = useRef<gsap.core.Tween | null>(null)

  const [draggable, setDraggable] = useState<_Draggable | null>(null)

  const timer = useRef<gsap.core.Tween | null>(null)
  const slideDelay = useRef(5)
  const slideDuration = useRef(1)
  const slideAnimation = useRef(
    gsap.to(
      {},
      {
        duration: 0.1,
      }
    )
  )

  const setPosition = useCallback(() => {
    items.current.forEach((item, i) =>
      gsap.set(item, {
        xPercent: i * 100,
        modifiers: {
          xPercent: gsap.utils.wrap(-200, (count.current - 2) * 100),
        },
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
        xPercent: gsap.utils.wrap(-200, (count.current - 2) * 100),
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

      setCircleDirection(direction)
    },
    [draggable]
  )

  const autoPlay = useCallback(() => {
    if (
      draggable &&
      timer.current &&
      (draggable.isDragging || draggable.isThrowing)
    ) {
      timer.current.restart(true)
    } else {
      animateSlides(-1)
    }
  }, [draggable, animateSlides])

  const setWidths = useCallback(() => {
    const [item] = items.current
    if (!item) return
    itemWidth.current = item.offsetWidth
    wrapWidth.current = itemWidth.current * count.current
  }, [])

  const setMargin = () => {
    const isNumber = (num: number | undefined): num is number => {
      return !!num
    }

    const titleHeights = titles.current
      .map((titleElement) => titleElement?.offsetHeight)
      .filter(isNumber)

    const maxTitleHeight = Math.max(...titleHeights)

    gsap.set(slider.current, {
      marginBottom: maxTitleHeight,
    })
  }

  const setHeight = () => {
    const [item] = items.current

    if (!item) return

    gsap.set(slider.current, {
      height: item.offsetHeight,
    })
  }

  const handleResize = useCallback(() => {
    const norm =
      Number(gsap.getProperty(proxy.current, 'x')) / wrapWidth.current || 0
    setWidths()
    setHeight()
    setMargin()
    gsap.set(proxy.current, {
      x: norm * wrapWidth.current,
    })
    // resetSnapPosition()
    animateSlides(0)
    slideAnimation.current.progress(1)
  }, [animateSlides, setWidths])

  // const handleImageLoad = () => {
  //   if (list?.current?.offsetHeight === 0) {
  //     handleResize()
  //   }
  // }

  const handleSnap = useCallback((x: number) => {
    const newPosition = gsap.utils.snap(itemWidth.current)(x)

    if (prevPosition.current < newPosition) {
      setCircleDirection(Direction.Left)
    }

    if (prevPosition.current > newPosition) {
      setCircleDirection(Direction.Right)
    }

    prevPosition.current = newPosition

    return newPosition

    // setSlide(snap)

    // return snap
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
      setMargin()
      setPosition()
      initDraggable()
      updateAnimation()

      timer.current = useTimer
        ? gsap.delayedCall(slideDelay.current, autoPlay)
        : null
    }
  }, [
    draggable,
    initDraggable,
    handleResize,
    setPosition,
    updateAnimation,
    setWidths,
    autoPlay,
    useTimer,
  ])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  const bg = useRef<HTMLDivElement>(null)
  const headings = useRef<(HTMLButtonElement | null)[]>([])

  return (
    <>
      {slides && (
        <section className="section-margin">
          <div
            ref={bg}
            className="pt-20 pb-10 hero-background bg-lime overflow-hidden
            md:pt-24 md:pb-12 xl:pt-28 xl:pb-14 2xl:pt-36 2xl:pb-24"
          >
            <div ref={slider} className="w-full relative">
              <ul ref={list} className="absolute inset-0 m-0 p-0">
                {reorderedSlides.map((slide) => (
                  <li
                    key={slide.title[locale]}
                    ref={(el) => items.current.push(el)}
                    className="absolute w-full sm:w-2/3 top-0 right-0 sm:right-1/6"
                  >
                    <div className="w-full">
                      <div
                        className="my-0 min-h-80 body-gutter-sm lg:body-gutter-lg
                      xl:body-gutter-xl 2xl:body-gutter-2xl mx-auto max-h-hero flex"
                      >
                        {slide.image && <ContentfulImage image={slide.image} />}
                      </div>
                      <div
                        ref={(el) => titles.current.push(el)}
                        className="absolute left-1/2 top-full transform flex justify-center
                        -translate-x-1/2 -translate-y-5 md:-translate-y-8 w-full
                        body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl"
                      >
                        <button
                          type="button"
                          ref={(el) => headings.current.push(el)}
                          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-9xl text-center
                          whitespace-normal uppercase font-bold text-blue-dark"
                        >
                          {slide.title[locale]}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <SlideButtons handleSlide={animateSlides} />
              <div className="absolute circle-position">
                <SpinningCircle direction={circleDirection} />
              </div>
            </div>
            {/* <div className="flex justify-center md:hidden"> */}
            {/*  <ShadowButton text="Explore" /> */}
            {/* </div> */}
          </div>
        </section>
      )}
    </>
  )
}

export default FeaturesSlideshow
