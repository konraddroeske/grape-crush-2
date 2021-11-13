import React, { FunctionComponent } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  selectProducts,
  toggleMenuOpen,
  toggleMobileMenuOpen,
} from '@redux/productsSlice'

import CloseIcon from '../../../assets/svgs/close-rounded.svg'
import FilterIcon from '../../../assets/svgs/filter-icon.svg'

interface Props {
  type: 'desktop' | 'mobile'
  menuOpen: boolean
}

const MenuToggle: FunctionComponent<Props> = ({ type, menuOpen }) => {
  const dispatch = useDispatch()
  const { totalSelectedTags, priceRangeMin, priceRangeMax, maxPrice } =
    useSelector(selectProducts())

  const handleClick = () => {
    if (type === 'desktop') {
      dispatch(toggleMenuOpen())
    } else {
      dispatch(toggleMobileMenuOpen())
    }
  }

  const isPriceRange =
    priceRangeMin > 0 || (priceRangeMax && maxPrice && priceRangeMax < maxPrice)

  return (
    <button
      type="button"
      className={`${
        type === 'mobile' ? '-ml-1' : 'ml-0'
      } flex items-center h-12`}
      onClick={() => handleClick()}
    >
      <span className="mr-1">
        {menuOpen ? (
          <CloseIcon className="w-3 mx-1" />
        ) : (
          <FilterIcon className="w-6" />
        )}
      </span>
      <span className="text-sm sm:text-base text-blue-dark font-bold uppercase whitespace-nowrap">
        <span className="hidden lg:inline">
          {menuOpen ? (
            <span className={`${menuOpen}`}>Hide&nbsp;</span>
          ) : (
            <span className={`${menuOpen}`}>Show&nbsp;</span>
          )}
        </span>
        Filters
      </span>
      {(totalSelectedTags > 0 || isPriceRange) && (
        <div
          className="ml-1 w-6 h-6 rounded-full bg-blue-lightest flex
      justify-center items-center text-blue-dark font-bold"
        >
          {isPriceRange ? totalSelectedTags + 1 : totalSelectedTags}
        </div>
      )}
    </button>
  )
}

export default MenuToggle
