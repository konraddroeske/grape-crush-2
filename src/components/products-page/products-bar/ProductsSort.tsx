import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  handleProductsSort,
  selectProducts,
  SortOption,
} from '@redux/productsSlice'

import TriangleArrow from '../../../assets/svgs/triangle-arrow.svg'

const ProductsSort: FunctionComponent = () => {
  const { productsSort } = useSelector(selectProducts())
  const sortMenu = useRef<null | HTMLUListElement>(null)
  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)
  const [scrollHeight, setScrollHeight] = useState<number>(0)

  const handleSelect = (option: string) => {
    dispatch(handleProductsSort(option))
  }

  const handleScrollHeight = () => {
    const height = sortMenu?.current?.scrollHeight || 0

    if (height > 0) {
      setScrollHeight(height)
    }
  }

  useEffect(() => {
    handleScrollHeight()
  }, [expanded])

  const sortOptions = [
    'date, new to old',
    'date, old to new',
    'alphabetical, a - z',
    'alphabetical, z - a',
    'price, high to low',
    'price, low to high',
  ] as SortOption[]

  return (
    <div className="relative w-full" onMouseLeave={() => setExpanded(false)}>
      <button
        type="button"
        className="flex items-center h-12 w-full"
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => setExpanded(true)}
        // onFocus={() => setExpanded(true)}
      >
        <span className="uppercase text-blue-dark text-sm sm:text-base font-bold mr-2">
          Sort
        </span>
        <TriangleArrow className="w-2" />
      </button>
      <ul
        ref={sortMenu}
        className="absolute z-10 top-full left-0 right-14 bg-white w-48
        overflow-hidden transition-all duration-300"
        style={{
          maxHeight: expanded ? `${scrollHeight}px` : 0,
        }}
      >
        {sortOptions.map((option) => {
          return (
            <li
              key={option}
              className="h-10 border border border-b-0 bg-white last:border-b"
            >
              <button
                type="button"
                className={`${
                  option === productsSort ? 'bg-lime' : 'bg-white'
                } h-full w-full pl-4 uppercase text-left text-xs font-medium 
                text-blue-dark hover:bg-lime`}
                onClick={() => {
                  setExpanded(!expanded)
                  handleSelect(option)
                }}
              >
                {option}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProductsSort
