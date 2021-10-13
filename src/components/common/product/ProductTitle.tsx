import React, { FunctionComponent } from 'react'

import Link from 'next/link'

interface OwnProps {
  name: string
  fontSize?: string
}

type Props = OwnProps

const ProductTitle: FunctionComponent<Props> = ({
  name,
  fontSize = 'text-base',
}) => {
  return (
    <Link href={`/item/${encodeURIComponent(name)}`}>
      <a>
        <h4 className={`${fontSize} text-left leading-5 font-bold uppercase`}>
          {name}
        </h4>
      </a>
    </Link>
  )
}

export default ProductTitle
