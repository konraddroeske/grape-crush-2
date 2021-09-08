import React, { FunctionComponent } from 'react'

import GreenCart from '../../assets/svgs/green-cart.svg'

const Cart: FunctionComponent = () => {
  return (
    <button type="button" className="flex">
      <GreenCart className="w-8" />
    </button>
  )
}

export default Cart
