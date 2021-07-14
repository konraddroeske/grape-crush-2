import React, { FunctionComponent } from 'react'

import BuyButton from '@components/common/BuyButton'
import ProductSubheading from '@components/common/product/ProductSubheading'
import ProductTitle from '@components/common/product/ProductTitle'
import { Product } from '@models/ambassador'

interface OwnProps {
  product: Product
}

type Props = OwnProps

const ProductSlide: FunctionComponent<Props> = ({ product }) => {
  const { _id: productId, data } = product
  const { name, vintage, variants, imageUrl, region } = data
  const [primaryImage] = imageUrl
  const [primaryVariant] = variants
  const { value } = primaryVariant

  return (
    <div className="w-52 md:w-64 xl:w-80 p-3 border rounded-xl border-gray-lightest overflow-hidden">
      <div className="image-container flex h-56 md:h-72 xl:h-96">
        <img
          src={primaryImage}
          alt=""
          className="block w-full object-cover min-h-full"
        />
      </div>
      <div className="mt-3">
        <ProductTitle name={name} />
        <div className="flex">
          <div className="flex-grow">
            <ProductSubheading region={region} vintage={vintage} />
            <p className="text-xs text-purple mt-1 font-bold">${value}</p>
          </div>
          <BuyButton productId={productId} />
        </div>
      </div>
    </div>
  )
}

export default ProductSlide
