import React, { FunctionComponent } from 'react'

import Link from 'next/link'

interface OwnProps {
  name: string
  fontSize?: string
  variant?: 'slideshow' | 'card'
}

type Props = OwnProps

const ProductTitle: FunctionComponent<Props> = ({ name, variant = 'card' }) => {
  const variants = {
    card: `text-left leading-5 font-bold uppercase`,
    slideshow: `text-left leading-5 font-bold uppercase`,
  }

  return (
    <Link href={`/item/${encodeURIComponent(name)}`}>
      <a>
        <h4 className={variants[variant]}>{name}</h4>
      </a>
    </Link>
  )
}

export default ProductTitle
