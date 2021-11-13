import React, { FunctionComponent } from 'react'

// import ProductArrow from '@assets/svgs/product-arrow.svg'
import Plus from '../../../assets/svgs/plus.svg'

interface OwnProps {
  children: React.ReactNode
  handleClick: () => void
}

type Props = OwnProps

const BuyButton: FunctionComponent<Props> = ({ handleClick, children }) => {
  return (
    <button
      type="button"
      className="flex py-2 px-3 h-8 bg-lime justify-between items-center
      cursor-pointer"
      onClick={() => handleClick()}
    >
      <span className="mr-1 text-xs text-blue-dark leading-none font-bold uppercase">
        {children}
      </span>
      <Plus className="w-3 ml-2 svg-blue-dark sm:hidden" />
    </button>
  )
}

export default BuyButton
