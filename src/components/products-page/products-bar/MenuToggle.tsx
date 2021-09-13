import React, { FunctionComponent } from 'react'

import { useDispatch } from 'react-redux'

import { toggleMenuOpen, toggleMobileMenuOpen } from '@redux/productsSlice'

import CloseIcon from '../../../assets/svgs/close-rounded.svg'
import FilterIcon from '../../../assets/svgs/filter-icon.svg'

interface Props {
  type: 'desktop' | 'mobile'
  menuOpen: boolean
}

const MenuToggle: FunctionComponent<Props> = ({ type, menuOpen }) => {
  const dispatch = useDispatch()
  // const { menuOpen } = useSelector(selectProducts())

  const handleClick = () => {
    if (type === 'desktop') {
      dispatch(toggleMenuOpen())
    } else {
      dispatch(toggleMobileMenuOpen())
    }
  }

  return (
    <button
      type="button"
      className="flex items-center h-12"
      onClick={() => handleClick()}
    >
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
      <span className="ml-1">
        {menuOpen ? (
          <CloseIcon className="w-3 mx-1" />
        ) : (
          <FilterIcon className="w-6" />
        )}
      </span>
    </button>
  )
}

export default MenuToggle
