import React, { FunctionComponent } from 'react'

import BuyButton from '@components/common/BuyButton'
import { Product } from '@models/ambassador'

interface OwnProps {
  product: Product
}

type Props = OwnProps

const ProductCard: FunctionComponent<Props> = ({ product }) => {
  const { _id: productId, data } = product
  const { Country, name, vintage, variants, imageUrl } = data
  const [primaryImage] = imageUrl
  const [primaryVariant] = variants
  const { value } = primaryVariant

  return (
    <div className="w-52 p-3 border rounded-xl border-gray-light overflow-hidden">
      <div className="image-container">
        <img src={primaryImage} alt="" />
      </div>
      <div className="mt-3">
        <h3 className="title text-base leading-4 font-bold uppercase">
          {name}
        </h3>
        <div className="flex">
          <div className="flex-grow">
            <div className="flex text-xs capitalize">
              {Country?.length > 0 && <p className="">{Country[0]}</p>}
              {Country?.length > 0 && vintage && (
                <span>&nbsp;&#8226;&nbsp;</span>
              )}
              <p>{vintage}</p>
            </div>
            <p className="text-xs text-purple mt-1 font-bold">${value}</p>
          </div>
          <BuyButton productId={productId} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
