import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { selectHero } from '@redux/heroSlice'

import CartIcon from '../../assets/svgs/cart.svg'

const Cart: FunctionComponent = () => {
  const { currentTheme } = useSelector(selectHero())
  const { nav } = currentTheme

  const textColor: { [key: string]: string } = {
    'gray-dark': 'text-gray-dark',
    white: 'text-white',
  }

  const svgColor: { [key: string]: string } = {
    'gray-dark': 'svg-gray-dark',
    white: 'svg-white',
  }

  return (
    <div className="flex">
      <div className={`mr-1 transition duration-700 ${textColor[nav]}`}>0</div>
      <CartIcon className={`w-5 ${svgColor[nav]}`} />
    </div>
  )
}

export default Cart
