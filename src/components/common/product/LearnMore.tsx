import React, { FunctionComponent } from 'react'

import ProductArrow from '../../../assets/svgs/product-arrow.svg'

const LearnMore: FunctionComponent = () => {
  return (
    <button type="button" className="flex items-center">
      <span className="mr-2 py-2 text-xs leading-none font-bold text-blue uppercase">
        Learn More
      </span>
      <ProductArrow className="" />
    </button>
  )
}

export default LearnMore
