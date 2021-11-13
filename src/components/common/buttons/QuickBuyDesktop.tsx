import React, { FunctionComponent } from 'react'

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
      className="flex py-2 px-3 bg-lime items-center border cursor-pointer w-full
      h-10 border-blue-dark shadow-blue-dark justify-center"
      onClick={() => handleClick()}
    >
      <span
        className="mr-1 text-xs text-blue-dark leading-none font-bold uppercase
      sm:text-sm"
      >
        {children}
      </span>
      <Plus className="w-3 ml-2 svg-blue-dark hidden" />
    </button>
  )
}

export default BuyButton
