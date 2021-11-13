import React, { FunctionComponent } from 'react'

import Plus from '@assets/svgs/plus.svg'

interface Props {
  children: React.ReactNode
  handleClick: () => void
}

const QuickBuyDesktopAlt: FunctionComponent<Props> = ({
  children,
  handleClick,
}) => {
  return (
    <button
      type="button"
      className="flex bg-lime justify-center items-center cursor-pointer w-full px-4 py-3"
      onClick={() => handleClick()}
    >
      <span className="mr-3 text-base text-blue-dark leading-none font-bold uppercase">
        {children}
      </span>
      <Plus className="w-3 svg-blue-dark" />
    </button>
  )
}

export default QuickBuyDesktopAlt
