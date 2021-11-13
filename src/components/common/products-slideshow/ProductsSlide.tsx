import React, { FunctionComponent, useState } from 'react'

import AmbassadorImage from '@components/common/AmbassadorImage'
import LearnMoreDesktop from '@components/common/product/LearnMoreDesktop'
import ProductSubheading from '@components/common/product/ProductSubheading'
import ProductTitle from '@components/common/product/ProductTitle'
import { getPriceAsString } from '@lib/getPriceAsString'
import { ProductLowercase } from '@models/ambassador'

interface OwnProps {
  product: ProductLowercase
}

type Props = OwnProps

const ProductsSlide: FunctionComponent<Props> = ({ product }) => {
  const { data } = product
  const { name, vintage, region, variants } = data
  const [variant] = variants
  const { amount } = variant
  const price = getPriceAsString(amount)

  const [buyVisible, setBuyVisible] = useState<boolean>(false)

  return (
    <div
      onMouseEnter={() => setBuyVisible(true)}
      onMouseLeave={() => setBuyVisible(false)}
    >
      <div className="relative h-80 lg:h-96 2xl:h-112 bg-blue-lightest p-4 pointer-events-auto">
        <AmbassadorImage
          url={product.data.imageUrl[0]}
          title={product.data.name}
        />
        {buyVisible && (
          <div className="absolute right-0 bottom-0 flex justify-start">
            <LearnMoreDesktop name={name} />
          </div>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex justify-between">
          <div className="flex-grow-1">
            <ProductTitle name={name} variant="slideshow" />
            {(region || vintage) && (
              <ProductSubheading
                region={region}
                vintage={vintage}
                variant="slideshow"
              />
            )}
          </div>
          {price && (
            <div className="block">
              <h5 className="text-sm leading-5 text-center font-bold uppercase">
                ${price}
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsSlide
