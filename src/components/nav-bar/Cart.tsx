import React, { FunctionComponent } from 'react'

import CartIcon from '../../assets/svgs/cart.svg'

const Cart: FunctionComponent = () => {
  const handleClick = () => {
    window.AmbassadorChat.send({
      command: 'webview',
      webview: 'payment-xdoxqKHH',
      webviewCommands: [{ command: 'viewCart' }],
    })
  }
  return (
    <button
      type="button"
      aria-label="open cart"
      className="flex justify-center items-center bg-lime w-8 h-8 rounded-full"
      onClick={() => handleClick()}
    >
      <CartIcon className="w-4" />
    </button>
  )
}

export default Cart
