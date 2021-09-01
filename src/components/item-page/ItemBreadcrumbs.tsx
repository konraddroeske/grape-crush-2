import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import { ProductLowercase } from '@models/ambassador'

interface OwnProps {
  // type: string
  // category: string
  // varietal: string
  product: ProductLowercase
}

type Props = OwnProps

const ItemBreadcrumbs: FunctionComponent<Props> = ({ product }) => {
  const { data, type } = product
  const { category, varietal } = data
  const [primaryVarietal] = varietal

  const router = useRouter()
  const handleClick = (newCategory: string, newTag: string) => {
    const href = `/products/?${newCategory}=${newTag}`
    router.push(href, href, { shallow: true })
  }

  return (
    <div className="flex flex-wrap text-xs leading-none">
      <div className="flex h-8 lg:h-12 items-center mr-2">
        <button
          type="button"
          className="leading-none uppercase text-xs lg:text-base text-blue-dark font-bold"
          onClick={() => handleClick('type', type)}
        >
          {type}
        </button>
      </div>
      {category && (
        <div className="flex h-8 lg:h-12 items-center">
          <span className="leading-none uppercase mr-2 text-sm lg:text-base text-blue-dark font-bold">
            {'>'}
          </span>
          <button
            type="button"
            className="uppercase mr-2 whitespace-nowrap text-sm lg:text-base text-blue-dark font-bold"
          >
            {category}
          </button>
        </div>
      )}
      {primaryVarietal && (
        <div className="flex h-8 lg:h-12 items-center">
          <span className="mr-2 text-base text-blue-dark font-bold">{'>'}</span>
          <button
            type="button"
            className="uppercase mr-2 whitespace-nowrap text-sm lg:text-base text-blue-dark font-bold"
            onClick={() => handleClick('varietal', primaryVarietal)}
          >
            {primaryVarietal}
          </button>
        </div>
      )}
    </div>
  )
}

export default ItemBreadcrumbs
