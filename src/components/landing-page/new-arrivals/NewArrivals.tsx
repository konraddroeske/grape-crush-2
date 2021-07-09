import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { gsap } from 'gsap'
import { Draggable, InertiaPlugin } from 'gsap/all'
import { useSelector } from 'react-redux'

import Wave from '@assets/svgs/lime-wave.svg'
import RoundedButton from '@components/common/RoundedButton'
import ProductCard from '@components/product-card/ProductCard'
import { selectIndex } from '@redux/indexSlice'

const NewArrivals: FunctionComponent = () => {
  const { newArrivals } = useSelector(selectIndex())

  const [draggable, setDraggable] = useState<Draggable | null>(null)

  const slider = useRef<HTMLElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const itemWidth = useRef(0)

  const remToPixels = (rem: number) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }

  const snapX = useCallback((x) => {
    const snapVal = Math.round(x / itemWidth.current) * itemWidth.current

    if (snapVal === 0) {
      return remToPixels(1)
    }

    return snapVal
  }, [])

  const setWidths = useCallback(() => {
    const [item] = items.current
    if (!item) return
    itemWidth.current = item.offsetWidth
  }, [])

  const initDraggable = useCallback(() => {
    const instance = new Draggable(list.current, {
      type: 'x',
      bounds: slider.current,
      inertia: true,
      snap: {
        x: snapX,
      },
    })

    setDraggable(instance)
  }, [snapX])

  useEffect(() => {
    if (!draggable) {
      gsap.registerPlugin(Draggable, InertiaPlugin)

      setWidths()
      initDraggable()
    }
  }, [initDraggable, draggable, setWidths])

  const handleResize = useCallback(() => {
    gsap.to(list.current, { x: 0 })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <section
      ref={slider}
      className="overflow-hidden relative mt-8 md:mt-16 xl:mt-24"
    >
      <h3 className="text-3xl font-bold center text-blue text-center uppercase">
        New Arrivals
      </h3>
      <ul
        ref={list}
        className="whitespace-nowrap inline-block pl-6 my-6 md:my-8 xl:my-12
        sm:body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl"
      >
        {newArrivals?.products.map((product) => {
          return (
            <li
              ref={(el) => items.current.push(el)}
              key={product.link}
              className="inline-block whitespace-normal align-top pr-6"
            >
              <ProductCard product={product} />
            </li>
          )
        })}
      </ul>
      <div className="flex justify-center">
        <RoundedButton variant="md">Browse More Wines</RoundedButton>
      </div>
      <div>
        <Wave className="w-full" />
      </div>
    </section>
  )
}

export default NewArrivals
