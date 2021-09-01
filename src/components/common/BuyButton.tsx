import React, { FunctionComponent } from 'react'

import Minus from '../../assets/svgs/minus.svg'
import Plus from '../../assets/svgs/plus.svg'

interface OwnProps {
  productId: string
  label: string
}

type Props = OwnProps

const BuyButton: FunctionComponent<Props> = () => {
  // const handleClick = () => {
  // if (window.AmbassadorChat) {
  //   window.AmbassadorChat.send({
  //     command: 'webview',
  //     webview: 'payment-xdoxqKHH',
  //     webviewCommands: [
  //       {
  //         command: 'addToCart',
  //         productId,
  //       },
  //     ],
  //   })
  // }
  // eslint-disable-next-line no-console
  //   console.log(productId)
  // }

  return (
    <div
      className="flex w-full max-w-xs h-9 mt-auto border border-blue-dark"
      // onClick={handleClick}
    >
      {/* <BuyIcon /> */}
      <div
        className="flex items-center pl-3 pr-2 mr-auto text-base
      text-blue-dark font-bold uppercase line-clamp leading-9"
      >
        {/* Add {label} to Cart */}
        Add to Cart
      </div>
      <button
        type="button"
        className="flex justify-center items-center w-10 border-l border-r h-full
        hover:bg-lime"
      >
        <Plus className="w-3" />
      </button>
      <button
        type="button"
        className="h-full flex justify-center items-center w-10 hover:bg-lime"
      >
        <Minus className="w-3" />
      </button>
    </div>
  )
}

export default BuyButton
