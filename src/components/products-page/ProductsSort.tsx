import React, { FunctionComponent, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  handleProductsSort,
  selectProducts,
  SortOption,
} from '@redux/productsSlice'

import SortArrow from '../../assets/svgs/sort-arrow.svg'

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

  const variant = {
    open: 'rounded-l-2xl rounded-b-none border-blue',
    close: 'rounded-l-3xl border-gray-light border-r-blue',
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex h-10 w-full"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={`flex items-center border flex-grow h-full min-w-0 bg-transparent placeholder-gray-dark text-xs pl-4 pr-2 ${
            expanded ? variant.open : variant.close
          }`}
        >
          <span className="capitalize">{productsSort}</span>
        </div>
        <div
          className="relative h-full flex justify-center items-center flex-none
          border bg-blue border-blue rounded-r-3xl w-14 text-lime font-bold text-xs"
        >
          <SortArrow />
        </div>
      </button>
      {expanded && (
        <ul className="absolute top-full left-0 right-14">
          {sortOptions
            .filter((option) => option !== productsSort)
            .map((option) => {
              return (
                <li
                  key={option}
                  className="h-10 border border-t-0 border-blue bg-white last:rounded-b-2xl"
                >
                  <button
                    type="button"
                    className="h-full w-full pl-4 capitalize text-left text-xs"
                    onClick={() => handleSelect(option)}
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
