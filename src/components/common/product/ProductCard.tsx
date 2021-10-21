import React, { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'

import { useSelector } from 'react-redux'

import AmbassadorImage from '@components/common/AmbassadorImage'
import LearnMore from '@components/common/product/LearnMore'
import ProductSubheading from '@components/common/product/ProductSubheading'

import Tags from '@components/common/product/Tags'
import QuickBuy from '@components/common/QuickBuy'
import { getPriceAsString } from '@lib/getPriceAsString'
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
  const [price, setPrice] = useState<string>('')
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
      setPrice(getPriceAsString(amount))
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
      className="flex flex-col h-full"
      onMouseEnter={() => setBuyVisible(true)}
      onMouseLeave={() => setBuyVisible(false)}
    >
      <div className="relative mb-4 sm:mb-6">
        <Link href={`/item/${encodeURIComponent(name)}`}>
          <a>
            <div
              className={`relative h-60 sm:h-72 lg:h-96 xl:h-96 2xl:h-122 relative bg-blue-lightest 
                ${url ? 'py-4 sm:p-4 lg:p-4 xl:p-4 2xl:p-4' : ''}`}
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
          <div className="hidden sm:block absolute bottom-3 left-3 right-3">
            <QuickBuy productId={id} />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow px-2 sm:px-0">
        <div className="flex justify-between mb-1">
          <div className="flex-grow-1">
            <ProductTitle name={name} fontSize="text-base" />
            {(region || vintage) && (
              <ProductSubheading region={region} vintage={vintage} />
            )}
          </div>
          {price && label && (
            <div className="hidden sm:block ml-3">
              <h5 className="text-sm leading-5 text-left font-bold uppercase">
                ${price}
              </h5>
            </div>
          )}
        </div>
        <div className="hidden sm:block">
          <Tags
            country={country}
            varietal={varietal}
            style={style}
            variant="card"
          />
        </div>
        <p className="hidden sm:block text-sm sm:line-clamp sm:line-clamp-p leading-5 mb-3">
          {description}
        </p>
        {price && label && (
          <div className="sm:hidden">
            <h5 className="text-sm leading-5 text-left font-bold uppercase">
              ${price}
            </h5>
          </div>
        )}
        <div className="mt-auto pt-2 sm:mt-0 sm:pt-0 flex justify-center sm:hidden">
          <QuickBuy productId={id} />
        </div>
        <div className="hidden mt-auto pt-2 sm:mt-0 sm:pt-0 sm:flex justify-start">
          <LearnMore name={name} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
