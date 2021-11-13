import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import useResizeObserver from '@react-hook/resize-observer'
import gsap from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin'

import debounce from 'lodash.debounce'

import AmbassadorImage from '@components/common/AmbassadorImage'
import ProductSubheading from '@components/common/product/ProductSubheading'
import ProductTitle from '@components/common/product/ProductTitle'
import ItemSlideButtons from '@components/item-page/item-slide-buttons/ItemSlideButtons'
import { getPriceAsString } from '@lib/getPriceAsString'
import { ProductLowercase } from '@models/ambassador'
import { Direction } from '@models/misc'

import s from './ProductsSlideshow.module.scss'

interface Props {
  products: ProductLowercase[]
}

const ProductsSlideshow: FunctionComponent<Props> = ({ products }) => {
  const useTimer = false
  const slider = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const titles = useRef<(HTMLDivElement | null)[]>([])
  const proxy = useRef<HTMLDivElement | null>(null)
  const prevPosition = useRef<number>(0)
  const count = useRef(products.length)

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
    if (items.current.length > 0) {
      const maxHeight = Math.max(
        ...items.current.map((item) => item?.offsetHeight || 0)
      )

      gsap.set(slider.current, {
        height: maxHeight,
      })
    }
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

  const containerRef = useRef<HTMLDivElement | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(debounce(handleResize, 200), [])

  useResizeObserver(containerRef, debouncedResize)

  return (
    <>
      {products && (
        <div ref={containerRef} className="relative">
          <div ref={slider} className="w-full relative overflow-hidden">
            <ul ref={list} className={`absolute inset-0 m-0 p-0 ${s.list}`}>
              {products.map((product, index) => {
                const { data } = product
                const { name, vintage, region, variants } = data
                const [variant] = variants
                const { amount } = variant
                const price = getPriceAsString(amount)

                return (
                  <li
                    key={product._id}
                    ref={(el) => {
                      items.current[index] = el
                    }}
                    className={s.item}
                  >
                    <div
                      className="relative h-80 lg:h-96 2xl:h-112 bg-blue-lightest
                    p-4 pointer-events-auto"
                    >
                      <AmbassadorImage
                        url={product.data.imageUrl[0]}
                        title={product.data.name}
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <div className="flex-grow-1">
                          <ProductTitle
                            name={name}
                            fontSize="text-sm"
                            variant="slideshow"
                          />
                          {(region || vintage) && (
                            <ProductSubheading
                              region={region}
                              vintage={vintage}
                              variant="slideshow"
                            />
                          )}
                        </div>
                        {price && (
                          <div className="block">
                            <h5 className="text-sm leading-5 text-center font-bold uppercase">
                              ${price}
                            </h5>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <ItemSlideButtons handleSlide={animateSlides} variant="products" />
        </div>
      )}
    </>
  )
}

export default ProductsSlideshow
