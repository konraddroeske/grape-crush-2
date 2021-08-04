import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import ProductArrow from '../../../assets/svgs/product-arrow.svg'

interface Props {
  name: string
}

const LearnMore: FunctionComponent<Props> = ({ name }) => {
  const uriName = encodeURIComponent(name)

  return (
    <Link href={`/item/${uriName}`}>
      <div className="flex items-center cursor-pointer">
        <span className="mr-2 py-2 text-xs leading-none font-bold text-blue uppercase">
          Learn More
        </span>
        <ProductArrow className="" />
      </div>
    </Link>
  )
}

export default LearnMore
