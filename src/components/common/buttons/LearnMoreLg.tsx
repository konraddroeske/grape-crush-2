import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import ProductArrow from '../../../assets/svgs/product-arrow.svg'

interface Props {
  name: string
}

const LearnMoreLg: FunctionComponent<Props> = ({ name }) => {
  const uriName = encodeURIComponent(name)

  return (
    <Link href={`/item/${uriName}`} shallow={false} scroll>
      <a>
        <div className="flex bg-lime justify-center w-full items-center cursor-pointer px-4 py-3">
          <span className="mr-2 text-base text-blue-dark leading-none font-bold uppercase">
            Learn More
          </span>
          <span className="sr-only">about {name}</span>
          <ProductArrow className="w-8 svg-blue-dark" />
        </div>
      </a>
    </Link>
  )
}

export default LearnMoreLg
