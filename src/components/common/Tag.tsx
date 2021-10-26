import React, { FunctionComponent } from 'react'

import Link from 'next/link'

interface OwnProps {
  category: string
  tag: string
  variant?: 'primary' | 'secondary'
}

type Props = OwnProps

const Tag: FunctionComponent<Props> = ({ category, tag }) => {
  return (
    <Link
      href={`/products?${encodeURIComponent(category)}=${encodeURIComponent(
        tag
      )}`}
    >
      <a>
        <div
          className="flex items-center font-sans h-7 text-2xs font-light text-blue-dark px-3
        uppercase bg-transparent border border-blue-tag hover:bg-lime"
        >
          <span className="block transform">{tag}</span>
        </div>
      </a>
    </Link>
  )
}

export default Tag
