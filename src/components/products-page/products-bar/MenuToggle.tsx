import React, { FunctionComponent } from 'react'

import { useDispatch } from 'react-redux'

import { handleMenuOpen } from '@redux/productsSlice'

import FilterIcon from '../../../assets/svgs/filter-icon.svg'

const MenuToggle: FunctionComponent = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(handleMenuOpen())
  }

  return (
    <button
      type="button"
      className="flex items-center"
      onClick={() => handleClick()}
    >
      <span className="text-base text-blue-dark font-bold uppercase mr-1 whitespace-nowrap">
        Show Filters
      </span>
      <FilterIcon className="w-6" />
    </button>
  )
}

export default MenuToggle
