import React, { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'

import { useSelector } from 'react-redux'

import AmbassadorImage from '@components/common/AmbassadorImage'
import LearnMore from '@components/common/product/LearnMore'
import ProductSubheading from '@components/common/product/ProductSubheading'

import Tags from '@components/common/product/Tags'
import QuickBuy from '@components/common/QuickBuy'
import { ProductDataLowercase } from '@models/ambassador'

import { selectProducts } from '@redux/productsSlice'

import ProductTitle from './ProductTitle'

interface OwnProps {
  id: string
  data: ProductDataLowercase
}

type Props = OwnProps

const ProductCard: FunctionComponent<Props> = ({ id, data }) => {
  const { missingImage } = useSelector(selectProducts())
  const [price, setPrice] = useState<number | null>(null)
  const [label, setLabel] = useState<string>('')
  const [url, setUrl] = useState<string | null>(null)
  const [buyVisible, setBuyVisible] = useState<boolean>(false)

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
    <div
      className=""
      onMouseEnter={() => setBuyVisible(true)}
      onMouseLeave={() => setBuyVisible(false)}
    >
      <div className="relative">
        <Link href={`/item/${encodeURIComponent(name)}`}>
          <a>
            <div
              className={`relative h-60 sm:h-72 lg:h-80 xl:h-80 2xl:h-122 relative bg-blue-light mb-6 
                ${url ? 'py-1 sm:py-2 xl:py-3 2xl:py-4' : ''}`}
            >
              {url ? (
                <AmbassadorImage url={url} title={name} />
              ) : (
                <AmbassadorImage
                  url={
                    missingImage?.url ||
                    'https://images.ctfassets.net/q0vbuozzojij/7lYYm9hx5eDUs2a0bbeB7L/513dc8bf19515816374ad5d28d864165/1.png'
                  }
                  title={missingImage?.title || 'Missing item.'}
                  imageStyle="object-cover"
                />
              )}
            </div>
          </a>
        </Link>
        {buyVisible && (
          <div className="absolute bottom-3 left-3 right-3">
            <QuickBuy productId={id} />
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex-grow-1">
          <ProductTitle name={name} fontSize="text-base" />
          {(region || vintage) && (
            <ProductSubheading region={region} vintage={vintage} />
          )}
        </div>
        {price && label && (
          <div className="w-10 ml-3">
            <h5 className="text-sm leading-5 text-left font-bold uppercase">
              {/* ${price} / {label} */}${price}
            </h5>
          </div>
        )}
      </div>
      <div className="mt-2">
        <Tags
          country={country}
          varietal={varietal}
          style={style}
          variant="card"
        />
      </div>
      {/* <div className="flex justify-center my-4"> */}
      {/*  <BuyButton productId={id} /> */}
      {/* </div> */}
      <p className="text-sm line-clamp line-clamp-p leading-5 mt-2 mb-3">
        {description}
      </p>
      <div className="flex justify-start items-center">
        <LearnMore name={name} />
      </div>
    </div>
  )
}

export default ProductCard
