import React, { FunctionComponent, useEffect, useState } from 'react'

import { ProductData } from '@models/ambassador'

interface OwnProps {
  data: ProductData
}

type Props = OwnProps

const Product: FunctionComponent<Props> = ({ data }) => {
  const [price, setPrice] = useState<number | null>(null)
  const {
    // imageUrl,
    name,
    Country: country,
    vintage,
    tags,
    variants,
    description,
  } = data

  useEffect(() => {
    const [variant] = variants
    if (variant) {
      const { amount } = variant
      setPrice(amount)
    }
  }, [data, variants, price])

  // const price =

  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <div>{name}</div>
      <div>
        <span>{country}</span>
        <span>{vintage}</span>
      </div>
      <ul>{tags}</ul>
      {/* <span>{price}</span> */}
      <p>{description}</p>
      <div>
        <div>
          <button type="button">Learn More</button>
        </div>
        <div>
          <button type="button">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product
