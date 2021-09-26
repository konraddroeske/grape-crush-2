import React, { FunctionComponent } from 'react'

import Link from 'next/link'

interface OwnProps {
  hasBorder: boolean
  category: string
  tag: string
}

type Props = OwnProps

const ItemBreadcrumbLink: FunctionComponent<Props> = ({
  hasBorder,
  category,
  tag,
}) => {
  const url = category
    ? `/products?${encodeURIComponent(category)}=${encodeURIComponent(tag)}`
    : '/products'
  const text = tag || 'All Products'
  return (
    <div className="flex items-center h-8 mr-2 lg:h-12">
      {category && <span className="mr-2 text-sm sm:text-base">{'>'}</span>}{' '}
      <span className="relative">
        <span
          className={`${
            hasBorder ? 'breadcrumb-border' : ''
          } uppercase text-sm sm:text-base font-bold text-blue-dark`}
        >
          <Link href={url}>
            <a>{text}</a>
          </Link>
        </span>
      </span>
    </div>
  )
}

export default ItemBreadcrumbLink
