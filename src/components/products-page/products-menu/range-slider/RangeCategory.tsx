import React, { FunctionComponent, useRef, useState } from 'react'

import useResizeObserver from '@react-hook/resize-observer'
import debounce from 'lodash.debounce'

import { useSelector } from 'react-redux'

import TriangleArrow from '@assets/svgs/triangle-arrow.svg'
import RangeSlider from '@components/products-page/products-menu/range-slider/RangeSlider'
import { selectProducts } from '@redux/productsSlice'

const RangeCategory: FunctionComponent = () => {
  const { maxPrice } = useSelector(selectProducts())

  const [menuOpen, setMenuOpen] = useState<boolean>(true)
  const [scrollHeight, setScrollHeight] = useState<string>('none')

  const arrowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleScrollHeight = (target: Element) => {
    const height = target?.scrollHeight || 0

    if (height > 0) {
      setScrollHeight(`${height}px`)
    }
  }

  const debouncedResize = debounce(handleScrollHeight, 25)
  useResizeObserver(containerRef, ({ target }) => debouncedResize(target))

  return (
    <>
      <div className="border-b-2 border-lime mb-4">
        <button
          type="button"
          className="flex items-center mb-4 pr-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <h3 className="text-2xl text-blue-dark font-bold uppercase mr-3">
            Price Range
          </h3>
          <div
            ref={arrowRef}
            className="transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <TriangleArrow className="w-3 transform" />
          </div>
        </button>
        <div
          ref={containerRef}
          className="overflow-hidden transition-all duration-700"
          style={{
            maxHeight: menuOpen ? scrollHeight : 0,
          }}
        >
          {maxPrice && <RangeSlider min={0} max={maxPrice} />}
        </div>
      </div>
    </>
  )
}

export default RangeCategory
