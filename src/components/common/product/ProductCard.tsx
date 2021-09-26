import React, { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'

import AmbassadorImage from '@components/common/AmbassadorImage'
import BuyButton from '@components/common/BuyButton'
import LearnMore from '@components/common/product/LearnMore'
import ProductSubheading from '@components/common/product/ProductSubheading'
import Tags from '@components/common/product/Tags'

import { ProductDataLowercase } from '@models/ambassador'

import ProductTitle from './ProductTitle'

interface OwnProps {
  id: string
  data: ProductDataLowercase
}

type Props = OwnProps

const ProductCard: FunctionComponent<Props> = ({ id, data }) => {
  const [price, setPrice] = useState<number | null>(null)
  const [label, setLabel] = useState<string>('')
  const [url, setUrl] = useState<string | null>(null)

  const {
    name,
    country,
    style,
    varietal,
    vintage,
    variants,
    description,
    region,
  } = data

  useEffect(() => {
    const [variant] = variants
    if (variant) {
      const { amount, label: primaryLabel } = variant
      setPrice(amount / 100)
      setLabel(primaryLabel)
    }

    const { imageUrl } = data
    if (imageUrl.length > 0) {
      const [image] = imageUrl
      setUrl(image)
    }
  }, [data, variants, price])

  return (
    <div className="">
      <Link href={`/item/${encodeURIComponent(name)}`}>
        <a>
          <div className="relative h-60 sm:h-64 lg:h-72 xl:h-80 2xl:h-96 relative bg-blue-light py-1 sm:py-2 xl:py-3 2xl:py-4 mb-6 hover:bg-lime-background">
            {url && <AmbassadorImage url={url} title={name} />}
          </div>
        </a>
      </Link>
      <ProductTitle name={name} fontSize="text-xl" />
      {(region || vintage) && (
        <ProductSubheading region={region} vintage={vintage} />
      )}
      {price && label && (
        <div>
          <h5 className="text-xl text-center font-bold my-2">
            ${price} / {label}
          </h5>
        </div>
      )}
      <div className="flex justify-center my-4">
        <BuyButton productId={id} />
      </div>
      <p className="text-sm line-clamp line-clamp-p leading-5">{description}</p>
      <div className="flex justify-between items-center my-2">
        <LearnMore name={name} />
      </div>
      <Tags
        country={country}
        varietal={varietal}
        style={style}
        variant="card"
      />
    </div>
  )
}

export default ProductCard
