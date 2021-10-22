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

import debounce from 'lodash.debounce'

import AmbassadorImage from '@components/common/AmbassadorImage'
import ItemSlideButtons from '@components/item-page/ItemSlideButtons'
import { Direction } from '@models/misc'

interface Props {
  slides: string[]
  title: string
}

const ItemSlideshow: FunctionComponent<Props> = ({ slides, title }) => {
  const useTimer = false
  const slider = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const titles = useRef<(HTMLDivElement | null)[]>([])
  const proxy = useRef<HTMLDivElement | null>(null)
  const prevPosition = useRef<number>(0)
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

  const handleSnap = useCallback((x: number) => {
    const newPosition = gsap.utils.snap(itemWidth.current)(x)

    prevPosition.current = newPosition

    return newPosition
  }, [])

  const initDraggable = useCallback(() => {
    const instance = Draggable.create(proxy.current, {
      type: 'x',
      trigger: list.current,
      inertia: true,
      dragResistance: 0.6,
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(debounce(handleResize, 500), [])

  useEffect(() => {
    window.addEventListener('resize', debouncedResize)

    return () => {
      window.removeEventListener('resize', debouncedResize)
    }
  }, [debouncedResize])

  return (
    <>
      {slides && (
        <div className="relative">
          <div ref={slider} className="w-full relative overflow-hidden">
            <ul ref={list} className="absolute inset-0 m-0 p-0">
              {slides.map((slide) => (
                <li
                  key={slide}
                  ref={(el) => items.current.push(el)}
                  className="absolute w-full top-0 right-0"
                >
                  <div className="w-full">
                    <div className="bg-blue-lightest pointer-events-auto p-6 h-122 xl:h-144">
                      {slide && <AmbassadorImage url={slide} title={title} />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ItemSlideButtons handleSlide={animateSlides} />
        </div>
      )}
    </>
  )
}

export default ItemSlideshow
