import React, { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'

import { useSelector } from 'react-redux'

import AmbassadorImage from '@components/common/AmbassadorImage'
import QuickBuyDesktopAlt from '@components/common/buttons/QuickBuyDesktopAlt'
import QuickBuyMobile from '@components/common/buttons/QuickBuyMobile'
import LearnMoreMobile from '@components/common/product/LearnMoreMobile'
import ProductSubheading from '@components/common/product/ProductSubheading'

import Tags from '@components/common/product/Tags'
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

  const handleClick = () => {
    if (window?.AmbassadorChat) {
      window.AmbassadorChat.send({
        command: 'webview',
        webview: 'payment-xdoxqKHH',
        webviewCommands: [
          {
            command: 'addToCart',
            productId: id,
          },
        ],
      })
    }
  }

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
              className={`relative h-60 sm:h-72 lg:h-96 2xl:h-112 bg-blue-lightest ${
                url ? 'py-4 sm:p-4' : ''
              } pointer-events-auto`}
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
          <div className="hidden sm:block absolute bottom-0 right-0">
            <QuickBuyDesktopAlt handleClick={handleClick}>
              Add to cart
            </QuickBuyDesktopAlt>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow px-2 sm:px-0">
        <div className="flex justify-between mb-1">
          <div className="flex-grow-1">
            <ProductTitle name={name} />
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
          <QuickBuyMobile handleClick={handleClick}>Add to cart</QuickBuyMobile>
        </div>
        <div className="hidden mt-auto pt-2 sm:mt-0 sm:pt-0 sm:flex justify-start">
          <LearnMoreMobile name={name} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
