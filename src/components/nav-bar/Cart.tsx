import React, { FunctionComponent } from 'react'

import GreenCart from '../../assets/svgs/green-cart.svg'

const Cart: FunctionComponent = () => {
  const handleClick = () => {
    window.AmbassadorChat.send({
      command: 'webview',
      webview: 'payment-xdoxqKHH',
      webviewCommands: [{ command: 'viewCart' }],
    })
  }
  return (
    <button type="button" className="flex" onClick={() => handleClick()}>
      <GreenCart className="w-8" />
    </button>
  )
}

export default Cart
