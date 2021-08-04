import React, { FunctionComponent } from 'react'

import ProductTags from '@components/common/product/ProductTags'
import FactList from '@components/item-page/FactList'
import { ProductLowercase } from '@models/ambassador'

export interface Props {
  product: ProductLowercase
}

export type Facts = { [key: string]: string | string[] }[]

const ItemContent: FunctionComponent<Props> = ({ product }) => {
  const { data } = product
  const {
    name: productName,
    region,
    winery,
    varietal,
    country,
    style,
    description,
    vintage,
    type,
    bottleSize,
    imageUrl,
  } = data

  const facts = [
    { winery },
    { vintage },
    { varietal },
    { region },
    { country },
    { type },
    { size: bottleSize },
  ] as Facts

  const [url] = imageUrl

  return (
    <div>
      <h1 className="py-6 font-bold text-2xl uppercase">{productName}</h1>
      {/* <h2>{region}</h2> */}
      {winery && <h2 className="text-xl">{winery}</h2>}
      {vintage && <h2 className="text-xl">{vintage}</h2>}
      <ProductTags
        country={country}
        style={style}
        varietal={varietal}
        variant="secondary"
      />
      {url && (
        <div className="my-6">
          <img className="object-cover w-full" src={url} alt="" />
        </div>
      )}
      <p className="text-white">{description}</p>
      <div className="my-6">
        <FactList facts={facts} />
      </div>
    </div>
  )
}

export default ItemContent
