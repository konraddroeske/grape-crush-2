import React, { FunctionComponent, useState } from 'react'

import Minus from '../../../assets/svgs/minus.svg'
import Plus from '../../../assets/svgs/plus.svg'

interface OwnProps {
  productId: string
}

type Props = OwnProps

const BuyButtonQuantity: FunctionComponent<Props> = ({ productId }) => {
  const [quantity, setQuantity] = useState<number>(1)

  const handleClick = () => {
    if (window?.AmbassadorChat) {
      window.AmbassadorChat.send({
        command: 'webview',
        webview: 'payment-xdoxqKHH',
        webviewCommands: [
          {
            command: 'addToCart',
            productId,
            quantity,
          },
        ],
      })
    }
  }

  const handleQuantity = (amount: number) => {
    const newAmount = quantity + amount
    if (newAmount > 0) {
      setQuantity(quantity + amount)
    }
  }

  return (
    <div className="flex justify-between w-full h-10 mt-auto max-w-lg">
      <div className="flex border border-blue-dark mr-4 hover:bg-lime">
        <button
          type="button"
          className="flex justify-center items-center w-12 h-full"
          onClick={() => handleQuantity(-1)}
        >
          <Minus className="w-3" />
        </button>
        <div className="flex justify-center items-center w-10 text-blue-dark font-bold">
          {quantity}
        </div>
        <button
          type="button"
          className="flex justify-center items-center w-12 h-full"
          onClick={() => handleQuantity(1)}
        >
          <Plus className="w-3" />
        </button>
      </div>
      <button
        type="button"
        className="flex items-center flex-grow pl-3 pr-2 mr-auto border border-blue-dark text-base
      text-blue-dark font-bold uppercase line-clamp leading-9 hover:bg-lime"
        onClick={() => handleClick()}
      >
        <span className="xs:hidden">Add</span>
        <span className="hidden xs:inline">Add to Cart</span>
      </button>
    </div>
  )
}

export default BuyButtonQuantity
