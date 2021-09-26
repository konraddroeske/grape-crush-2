import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import MenuToggle from '@components/products-page/products-bar/MenuToggle'
import ProductsBreadcrumbs from '@components/products-page/products-bar/ProductsBreadcrumbs'
import ProductsSearch from '@components/products-page/products-bar/ProductsSearch'
import ProductsSort from '@components/products-page/products-bar/ProductsSort'
import { selectProducts } from '@redux/productsSlice'

const ProductsBar: FunctionComponent = () => {
  const { menuOpen, mobileMenuOpen } = useSelector(selectProducts())

  return (
    <div className="flex h-12 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
      <div className="hidden lg:flex items-center mr-auto">
        <ProductsBreadcrumbs />
      </div>
      <div className="flex w-full items-center lg:w-auto">
        <div className="flex mr-2 lg:mr-0">
          <div className="hidden lg:block mr-3 lg:mr-6">
            <MenuToggle type="desktop" menuOpen={menuOpen} />
          </div>
          <div className="lg:hidden mr-3 lg:mr-6">
            <MenuToggle type="mobile" menuOpen={mobileMenuOpen} />
          </div>
          <div className="mr-3 lg:mr-6">
            <ProductsSort />
          </div>
        </div>
        <div className="ml-auto lg:ml-0">
          <ProductsSearch />
        </div>
      </div>
    </div>
  )
}

export default ProductsBar
