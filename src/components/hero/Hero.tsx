import React, { FunctionComponent, useCallback, useEffect, useRef } from "react"

import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { InertiaPlugin } from "gsap/InertiaPlugin"

import SlideButtons from "@components/hero/SlideButtons"
import { HeroSlides } from "@models/hero"

interface OwnProps {
  slides: HeroSlides[]
}

type Props = OwnProps

const Hero: FunctionComponent<Props> = ({ slides }) => {
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
  const draggable = useRef<Draggable | null>(null)
  const animation = useRef<gsap.core.Tween | null>(null)

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
    // console.log("update progress", animation.current)
    if (!animation.current) return
    animation.current.progress(
      gsap.utils.wrap(
        0,
        1,
        Number(gsap.getProperty(proxy.current, "x")) / wrapWidth.current
      )
    )
  }

  const updateAnimation = useCallback(() => {
    animation.current = gsap.to(items.current, {
      duration: 1,
      xPercent: `+=${count.current * 100}`,
      ease: "none",
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

  const resetSnapPosition = () => {
    const snap = draggable?.current?.vars?.snap as Draggable.SnapObject
    if (!snap.x) return
    snap.x = gsap.utils.snap(itemWidth.current)
  }

  const animateSlides = useCallback((direction: number) => {
    if (draggable.current && draggable.current.isThrowing) {
      draggable.current.tween.kill()
    }

    if (timer.current) timer.current.restart(true)
    slideAnimation.current.kill()

    const xVal = snapX(
      Number(gsap.getProperty(proxy.current, "x")) +
        direction * itemWidth.current
    )

    slideAnimation.current = gsap.to(proxy.current, {
      duration: slideDuration.current,
      x: xVal,
      onUpdate: updateProgress,
    })
  }, [])

  const autoPlay = useCallback(() => {
    if (
      draggable.current &&
      timer.current &&
      // draggable.current.isPressed ||
      (draggable.current.isDragging || draggable.current.isThrowing)
    ) {
      timer.current.restart(true)
    } else {
      animateSlides(-1)
    }
  }, [animateSlides])

  const setWidths = useCallback(() => {
    const [item] = items.current
    if (!item) return
    itemWidth.current = item.offsetWidth
    wrapWidth.current = itemWidth.current * count.current
  }, [])

  const setPadding = () => {
    const isNumber = (num: number | undefined): num is number => {
      return !!num
    }

    const titleHeights = titles.current
      .map((title) => title?.offsetHeight)
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

  const resize = () => {
    const norm =
      Number(gsap.getProperty(proxy.current, "x")) / wrapWidth.current || 0
    setWidths()
    setHeight()
    setPadding()
    gsap.set(proxy.current, {
      x: norm * wrapWidth.current,
    })
    resetSnapPosition()
    animateSlides(0)
    slideAnimation.current.progress(1)
  }

  const handleResize = useCallback(resize, [resize])

  const setDraggable = useCallback(() => {
    draggable.current = new Draggable(proxy.current, {
      type: "x",
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
        x: gsap.utils.snap(itemWidth.current),
      },
    })
  }, [])

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin)

    proxy.current = document.createElement("div")
    gsap.set(proxy.current, {
      x: 0,
    })

    setWidths()
    setHeight()
    setPadding()
    setPosition()
    setDraggable()
    updateAnimation()

    timer.current = useTimer
      ? gsap.delayedCall(slideDelay.current, autoPlay)
      : null

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [
    handleResize,
    setDraggable,
    setPosition,
    updateAnimation,
    setWidths,
    autoPlay,
    useTimer,
  ])

  return (
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
                  src={slide.image.file["en-US"].url}
                  alt="label"
                />
              </div>
              <div
                ref={(el) => titles.current.push(el)}
                className="absolute left-1/2 top-full px-8 transform -translate-x-1/2 -translate-y-5 w-full"
              >
                <h2 className="text-4xl text-center whitespace-normal uppercase font-bold">
                  {slide.title}
                </h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <SlideButtons animateSlides={animateSlides} />
    </div>
  )
}

export default Hero
