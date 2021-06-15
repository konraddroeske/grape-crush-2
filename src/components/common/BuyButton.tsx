import React, { FunctionComponent } from 'react'

import BuyIcon from '../../assets/svgs/buy-button.svg'

interface OwnProps {
  productId: string
}

type Props = OwnProps

const BuyButton: FunctionComponent<Props> = ({ productId }) => {
  const handleClick = () => {
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
    console.log(productId)
  }

  return (
    <button type="button" className="w-8 mt-auto" onClick={handleClick}>
      <BuyIcon />
    </button>
  )
}

export default BuyButton
