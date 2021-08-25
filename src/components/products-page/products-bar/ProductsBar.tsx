import React, { FunctionComponent } from 'react'

import MenuToggle from '@components/products-page/products-bar/MenuToggle'
import ProductsBreadcrumbs from '@components/products-page/products-bar/ProductsBreadcrumbs'
import ProductsSearch from '@components/products-page/products-bar/ProductsSearch'
import ProductsSort from '@components/products-page/products-bar/ProductsSort'

const ProductsBar: FunctionComponent = () => {
  return (
    <div className="flex body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
      <div className="flex items-center mr-auto">
        <ProductsBreadcrumbs />
      </div>
      <div className="flex items-center">
        <div className="mr-6">
          <MenuToggle />
        </div>
        <div className="mr-6">
          <ProductsSort />
        </div>
        <ProductsSearch />
      </div>
    </div>
  )
}

export default ProductsBar
