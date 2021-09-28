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
      <a>
        <div className="flex bg-lime items-center cursor-pointer">
          <span className="mr-2 text-base text-blue-dark leading-none font-bold uppercase">
            Learn More
          </span>
          <ProductArrow className="w-8 svg-blue-dark" />
        </div>
      </a>
    </Link>
  )
}

export default LearnMore
