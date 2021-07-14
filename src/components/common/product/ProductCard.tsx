import React, { FunctionComponent, useEffect, useState } from 'react'

import BuyButton from '@components/common/BuyButton'
import LearnMore from '@components/common/product/LearnMore'
import ProductSubheading from '@components/common/product/ProductSubheading'
import ProductTags from '@components/common/product/ProductTags'
import { ProductData } from '@models/ambassador'

import ProductTitle from './ProductTitle'

interface OwnProps {
  id: string
  data: ProductData
}

type Props = OwnProps

const ProductCard: FunctionComponent<Props> = ({ id, data }) => {
  const [price, setPrice] = useState<number | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  // console.log(data)
  const {
    // imageUrl,
    name,
    Country: country,
    Style: style,
    Varietal: varietal,
    vintage,
    // tags,
    variants,
    description,
    region,
  } = data

  useEffect(() => {
    const [variant] = variants
    if (variant) {
      const { amount } = variant
      setPrice(amount / 100)
    }

    const { imageUrl } = data
    if (imageUrl.length > 0) {
      const [image] = imageUrl
      setUrl(image)
    }
  }, [data, variants, price])

  // console.log(tags)

  return (
    <div className="border border-gray-lightest rounded-3xl p-4">
      <div>{url && <img src={url} alt="" className="pb-6" />}</div>
      <ProductTitle name={name} fontSize="text-xl" />
      <ProductSubheading region={region} vintage={vintage} />
      <ProductTags country={country} varietal={varietal} style={style} />
      <h5 className="text-lg font-bold my-2">${price}</h5>
      <p className="text-sm line-clamp line-clamp-p leading-5">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <LearnMore />
        <BuyButton productId={id} />
      </div>
    </div>
  )
}

export default ProductCard
