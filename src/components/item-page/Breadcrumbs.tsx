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

const Breadcrumbs: FunctionComponent<Props> = ({ product }) => {
  const { data, type } = product
  const { category, varietal } = data
  const [primaryVarietal] = varietal

  // console.log(product)

  const router = useRouter()
  const handleClick = (newCategory: string, newTag: string) => {
    const href = `/products/?${newCategory}=${newTag}`
    router.push(href, href, { shallow: true })
  }
  return (
    <div className="flex flex-wrap text-xs leading-none">
      <button
        type="button"
        className="mr-2 uppercase mb-2"
        onClick={() => handleClick('type', type)}
      >
        {type}
      </button>
      {category && (
        <span className="flex items-center mr-2 mb-2">
          <span className="mr-2 leading-none">{'>'}</span>
          <button type="button" className="uppercase">
            {category}
          </button>
        </span>
      )}
      {primaryVarietal && (
        <span className="flex items-center mb-2">
          <span className="mr-2">{'>'}</span>
          <button
            type="button"
            className="uppercase"
            onClick={() => handleClick('varietal', primaryVarietal)}
          >
            {primaryVarietal}
          </button>
        </span>
      )}
    </div>
  )
}

export default Breadcrumbs
