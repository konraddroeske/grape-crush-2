import React, { FunctionComponent } from 'react'

import Plus from '../../assets/svgs/plus.svg'

interface OwnProps {
  productId: string
}

type Props = OwnProps

const BuyButton: FunctionComponent<Props> = ({ productId }) => {
  const handleClick = () => {
    if (window?.AmbassadorChat) {
      window.AmbassadorChat.send({
        command: 'webview',
        webview: 'payment-xdoxqKHH',
        webviewCommands: [
          {
            command: 'addToCart',
            productId,
          },
        ],
      })
    }
  }

  return (
    <div className="flex w-full max-w-2xs h-9 mt-auto border border-blue-dark">
      <div
        className="flex items-center pl-3 pr-2 mr-auto text-base
      text-blue-dark font-bold uppercase line-clamp leading-9"
      >
        Add to Cart
      </div>
      <button
        type="button"
        className="flex justify-center items-center w-10 border-l h-full
        hover:bg-lime"
        onClick={() => handleClick()}
      >
        <Plus className="w-3" />
      </button>
      {/* <button */}
      {/*  type="button" */}
      {/*  className="h-full flex justify-center items-center w-10 hover:bg-lime" */}
      {/* > */}
      {/*  <Minus className="w-3" /> */}
      {/* </button> */}
    </div>
  )
}

export default BuyButton
