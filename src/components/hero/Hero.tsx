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
import { useDispatch, useSelector } from 'react-redux'

import RoundedButton from '@components/common/RoundedButton'
import SlideButtons from '@components/hero/SlideButtons'
import { Direction, HeroSlides } from '@models/hero'
import { selectHero, setCurrentTheme } from '@redux/heroSlice'

import Wave from '../../assets/svgs/wave.svg'

interface OwnProps {
  slides: HeroSlides[]
}

type Props = OwnProps

const Hero: FunctionComponent<Props> = ({ slides }) => {
  const dispatch = useDispatch()
  const { currentTheme } = useSelector(selectHero())
  const { background: bgColor, title: titleColor, duration } = currentTheme

  const useTimer = false
  const slider = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const titles = useRef<(HTMLDivElement | null)[]>([])
  const proxy = useRef<HTMLDivElement | null>(null)

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

  const setSlide = useCallback(
    (snap: number) => {
      const totalSlides = snap / itemWidth.current

      const getCurrentSlide = (numSlides: number): number => {
        if (numSlides === 0 || numSlides % slides.length === 0) {
          return 0
        }
        if (numSlides < 0) {
          return Math.abs(numSlides) % slides.length
        }
        return slides.length - (numSlides % slides.length)
      }

      const setSlideState = (newSlide: number) => {
        dispatch(setCurrentTheme(newSlide))
      }

      const slide = getCurrentSlide(totalSlides)

      setSlideState(slide)
    },
    [dispatch, slides.length]
  )

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

      setSlide(xVal)

      slideAnimation.current = gsap.to(proxy.current, {
        duration: slideDuration.current,
        x: xVal,
        onUpdate: updateProgress,
      })
    },
    [draggable, setSlide]
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

  const handleImageLoad = () => {
    if (list?.current?.offsetHeight === 0) {
      handleResize()
    }
  }

  const handleSnap = useCallback(
    (x: number) => {
      const snap = gsap.utils.snap(itemWidth.current)(x)

      setSlide(snap)

      return snap
    },
    [setSlide]
  )

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
  const headings = useRef<(HTMLHeadingElement | null)[]>([])

  useEffect(() => {
    gsap.to(bg.current, {
      duration,
      backgroundColor: bgColor,
    })

    gsap.to('.svg-wave path', {
      duration,
      fill: bgColor,
    })

    gsap.to(headings.current, {
      duration,
      color: titleColor,
    })
  }, [bgColor, titleColor, duration])

  return (
    <section>
      <div ref={bg} className="pt-16 pb-6 hero-background bg-purple">
        <div ref={slider} className="w-full relative">
          <ul ref={list} className="absolute inset-0 m-0 p-0">
            {reorderedSlides.map((slide) => (
              <li
                key={slide.title}
                ref={(el) => items.current.push(el)}
                className="absolute w-full top-0 left-0"
              >
                <div className="w-screen">
                  <div className="w-full my-0 px-6 mx-auto">
                    <img
                      className="block w-full my-0 mx-auto rounded-xl"
                      src={slide.image.file['en-US'].url}
                      alt="label"
                      onLoad={() => handleImageLoad()}
                    />
                  </div>
                  <div
                    ref={(el) => titles.current.push(el)}
                    className="absolute left-1/2 top-full px-8 transform -translate-x-1/2 -translate-y-5 w-full"
                  >
                    <h2
                      ref={(el) => headings.current.push(el)}
                      className="text-4xl text-center whitespace-normal uppercase font-bold color-lime"
                    >
                      {slide.title}
                    </h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <SlideButtons handleSlide={animateSlides} />
        </div>
        <div className="flex justify-center">
          <RoundedButton>Shop Now</RoundedButton>
        </div>
      </div>
      <div>
        <Wave className="w-full svg-wave svg-purple" />
      </div>
    </section>
  )
}

export default Hero
