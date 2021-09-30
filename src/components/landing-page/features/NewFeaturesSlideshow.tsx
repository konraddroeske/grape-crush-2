import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin'
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import OutlineMarquee from '@components/common/OutlineMarquee'
import FeaturesText from '@components/landing-page/features/FeaturesText'
import SlideButtons from '@components/landing-page/features/SlideButtons'
import SpinningCircle from '@components/landing-page/features/SpinningCircle'
import { Direction } from '@models/misc'
import { selectGlobal } from '@redux/globalSlice'

const NewFeaturesSlideshow: FunctionComponent = () => {
  const { heroSlides: slides } = useSelector(selectGlobal())
  const [circleDirection, setCircleDirection] = useState<Direction>(-1)
  const [upcomingSlide, setUpcomingSlide] = useState<number>(0)
  // const upcomingSlide = useRef<number>(0)

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

  const [draggable, setDraggable] = useState<Draggable[] | null>(null)

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
      if (draggable && draggable[0].isThrowing) {
        draggable[0].tween.kill()
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

      setUpcomingSlide(calculatePositionFromSnap(xVal))
      setCircleDirection(direction)
    },
    [draggable]
  )

  const autoPlay = useCallback(() => {
    if (
      draggable &&
      timer.current &&
      (draggable[0].isDragging || draggable[0].isThrowing)
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

  const handleOpacity = useCallback((newSlide: number) => {
    const prev = newSlide === 0 ? count.current - 1 : newSlide - 1

    items.current.forEach((item, index) => {
      if (index === prev) {
        gsap.to(item, {
          opacity: 0,
          duration: slideDuration.current / 2,
          delay: slideDuration.current / 2,
        })
      } else {
        gsap.to(item, {
          opacity: 1,
          duration: slideDuration.current / 2,
          // delay: slideDuration.current / 2,
        })
      }
    })
  }, [])

  const calculatePositionFromSnap = (newPosition: number) => {
    if (newPosition === 0) {
      return 0
    }

    const val = newPosition / itemWidth.current

    if (val % count.current === 0) {
      return 0
    }

    if (val > 0) {
      return count.current - (val % count.current)
    }

    return Math.abs(val) % count.current
  }

  const handleSnap = useCallback((x: number) => {
    const newPosition = gsap.utils.snap(itemWidth.current)(x)

    setUpcomingSlide(calculatePositionFromSnap(newPosition))

    if (prevPosition.current < newPosition) {
      setCircleDirection(Direction.Left)
    }

    if (prevPosition.current > newPosition) {
      setCircleDirection(Direction.Right)
    }

    prevPosition.current = newPosition

    return newPosition
  }, [])

  const initDraggable = useCallback(() => {
    const instance = Draggable.create(proxy.current, {
      type: 'x',
      trigger: list.current,
      inertia: true,
      dragResistance: 0.75,
      onPress() {
        slideAnimation.current.kill()
        // eslint-disable-next-line react/no-this-in-sfc
        this.update()
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      // onThrowComplete: handleOpacity,
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

  useEffect(() => {
    // console.log('handling opacity', upcomingSlide)
    handleOpacity(upcomingSlide)
  }, [handleOpacity, upcomingSlide])

  return (
    <>
      {slides && (
        <section className="section-margin">
          <OutlineMarquee text="Shop by Featured" direction="-=" />
          <div className="hero-background overflow-hidden features-slideshow-padding">
            <div ref={slider} className="w-full relative">
              <FeaturesText
                slides={reorderedSlides}
                upcomingSlide={upcomingSlide}
              />
              <ul ref={list} className="absolute inset-0 m-0 p-0">
                {reorderedSlides.map((slide, index) => (
                  <li
                    key={slide.title}
                    ref={(el) => {
                      items.current[index] = el
                    }}
                    className="absolute slide-width top-0"
                  >
                    <div className="w-full">
                      <div
                        className="my-0 min-h-80 max-h-75vh body-gutter-sm
                      md:px-0 image-width mx-auto flex"
                      >
                        {slide.image && <ContentfulImage image={slide.image} />}
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
          </div>
        </section>
      )}
    </>
  )
}

export default NewFeaturesSlideshow
