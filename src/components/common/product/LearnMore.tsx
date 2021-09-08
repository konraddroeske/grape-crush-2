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
        <span className="mr-2 py-2 text-base leading-none font-bold uppercase">
          Learn More
        </span>
        <ProductArrow className="w-8" />
      </div>
    </Link>
  )
}

export default LearnMore
