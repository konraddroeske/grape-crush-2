import React, { FunctionComponent, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  handleProductsSort,
  selectProducts,
  SortOption,
} from '@redux/productsSlice'

import TriangleArrow from '../../../assets/svgs/triangle-arrow.svg'

const ProductsSort: FunctionComponent = () => {
  const { productsSort } = useSelector(selectProducts())
  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)

  const handleSelect = (option: string) => {
    dispatch(handleProductsSort(option))
  }

  const sortOptions = [
    'alphabetical, a - z',
    'alphabetical, z - a',
    'price, high to low',
    'price, low to high',
    'date, new to old',
    'date, old to new',
  ] as SortOption[]

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex items-center h-12 w-full"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="uppercase text-blue-dark text-base font-bold mr-2">
          Sort
        </span>
        <TriangleArrow className="w-2" />
      </button>
      {expanded && (
        <ul className="absolute z-10 top-full left-0 right-14 bg-white w-48 border">
          {sortOptions.map((option) => {
            return (
              <li
                key={option}
                className="h-10 border border-t-0 border-l-0 border-r-0 border-blue-dark bg-white last:border-b-0"
              >
                <button
                  type="button"
                  className={`${
                    option === productsSort ? 'bg-lime' : 'bg-white'
                  } h-full w-full pl-4 uppercase text-left text-xs font-medium text-blue-dark`}
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
      )}
    </div>
  )
}

export default ProductsSort
