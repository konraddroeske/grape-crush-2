import React, { FunctionComponent } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import { selectProducts } from '@redux/productsSlice'

interface OwnProps {
  hasBorder: boolean
  category: string
  tag: string
}

type Props = OwnProps

const ProductsBreadcrumbLink: FunctionComponent<Props> = ({
  hasBorder,
  category,
  tag,
}) => {
  const { totalSelected } = useSelector(selectProducts())
  const url = category
    ? `/products?${encodeURIComponent(category)}=${encodeURIComponent(tag)}`
    : '/products'
  const text = tag || 'All Products'

  return (
    <div className="flex items-center h-8 lg:h-12">
      {category.length > 0 && (
        <span className="mr-2 text-sm sm:text-base">{'>'}</span>
      )}
      <span className="relative mr-2">
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
      {hasBorder && (
        <span className="uppercase mr-2 text-sm sm:text-base text-blue-dark">
          ({totalSelected.length})
        </span>
      )}
    </div>
  )
}

export default ProductsBreadcrumbLink
