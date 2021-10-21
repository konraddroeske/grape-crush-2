import React, { FunctionComponent } from 'react'

// import ProductArrow from '@assets/svgs/product-arrow.svg'
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
    // <div className="flex w-full h-9 mt-auto border border-blue-dark">
    // <button
    //   type="button"
    //   className="flex items-center w-full mr-auto text-sm h-10 border border-blue-dark shadow-blue-dark
    //   bg-lime font-bold text-blue-dark uppercase line-clamp leading-9"
    //   onClick={() => handleClick()}
    // >
    //   Add to Cart
    // </button>
    // </div>
    <button
      type="button"
      className="flex py-2 px-3 h-8 bg-lime justify-between items-center
      cursor-pointer sm:w-full sm:h-10 sm:justify-between"
      onClick={() => handleClick()}
    >
      <span
        className="mr-1 text-xs text-blue-dark leading-none font-bold uppercase
      sm:text-sm"
      >
        Add To Cart
      </span>
      <Plus className="w-3 ml-2 svg-blue-dark" />
    </button>
  )
}

export default BuyButton
