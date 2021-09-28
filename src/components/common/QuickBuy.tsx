import React, { FunctionComponent } from 'react'

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
    // <div className="flex w-full h-9 mt-auto border border-blue-dark">
    <button
      type="button"
      className="flex items-center w-full mr-auto text-sm h-10 border border-blue-dark shadow-blue-dark
      bg-lime font-bold text-blue-dark uppercase line-clamp leading-9"
      onClick={() => handleClick()}
    >
      Add to Cart
    </button>
    // </div>
  )
}

export default BuyButton
