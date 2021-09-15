import React, { FunctionComponent } from 'react'

import Link from 'next/link'

interface OwnProps {
  category: string
  tag: string
  variant?: 'primary' | 'secondary'
}

type Props = OwnProps

const Tag: FunctionComponent<Props> = ({
  category,
  tag,
  variant = 'primary',
}) => {
  const variants = {
    primary:
      'font-sans text-2xs font-light text-blue-dark py-1 px-3 uppercase bg-transparent border border-blue-dark hover:bg-lime',
    secondary:
      'font-sans text-2xs font-light py-2 px-4 rounded-3xl uppercase bg-transparent border border-lime',
  }

  return (
    <Link
      href={`/products?${encodeURIComponent(category)}=${encodeURIComponent(
        tag
      )}`}
    >
      <a>
        <div className={variants[variant]}>{tag}</div>
      </a>
    </Link>
  )
}

export default Tag
