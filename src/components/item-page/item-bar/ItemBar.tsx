import React, { FunctionComponent } from 'react'

import ItemBreadcrumbs from '@components/item-page/ItemBreadcrumbs'
import ProductsSearch from '@components/products-page/products-bar/ProductsSearch'
import { ProductLowercase } from '@models/ambassador'

interface Props {
  product: ProductLowercase
}

const ProductsBar: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="flex h-8 overflow-hidden lg:h-12 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
      <div className="lg:mr-auto">
        <ItemBreadcrumbs product={product} />
      </div>
      <div className="hidden items-center lg:flex">
        <ProductsSearch />
      </div>
    </div>
  )
}

export default ProductsBar
