import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import { selectHero } from '@redux/heroSlice'

import CartIcon from '../../assets/svgs/cart.svg'

const Cart: FunctionComponent = () => {
  const { currentTheme } = useSelector(selectHero())
  const { nav, duration } = currentTheme

  const counterRef = useRef(null)

  useEffect(() => {
    gsap.to(counterRef.current, {
      duration,
      color: nav,
    })

    gsap.to('.svg-cart path', {
      duration,
      fill: nav,
    })
  }, [duration, nav])

  return (
    <div className="flex">
      <div ref={counterRef} className="mr-1">
        0
      </div>
      <CartIcon className="w-5 svg-cart svg-gray-dark" />
    </div>
  )
}

export default Cart
