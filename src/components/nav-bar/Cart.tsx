import React, { FunctionComponent, useEffect } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import { selectGlobal } from '@redux/globalSlice'
import { selectHero } from '@redux/heroSlice'

import CartIcon from '../../assets/svgs/cart.svg'

const Cart: FunctionComponent = () => {
  const { navOpen } = useSelector(selectGlobal())
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme

  useEffect(() => {
    gsap.to('.svg-cart path', {
      duration,
      fill: nav,
    })
  }, [duration, nav])

  useEffect(() => {
    gsap.set('.svg-cart path', {
      fill: navOpen ? '#414042' : nav,
    })
  }, [navOpen, nav])

  return (
    <div className="flex">
      <CartIcon className="w-5 svg-cart svg-gray-dark" />
    </div>
  )
}

export default Cart
