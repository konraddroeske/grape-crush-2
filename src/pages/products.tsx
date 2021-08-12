import React, { FunctionComponent } from 'react'

import ProductsList from '@components/products-page/products-list/ProductsList'
import ProductsMenu from '@components/products-page/products-menu/ProductsMenu'
import ProductsSearch from '@components/products-page/ProductsSearch'
import ProductsSort from '@components/products-page/ProductsSort'
import fetchGlobalData from '@lib/fetchGlobalData'
import { setLocale, setPages } from '@redux/globalSlice'
import { setAllTags, setCategories, setProducts } from '@redux/productsSlice'
import { setIgImages } from '@redux/socialSlice'
import { wrapper } from '@redux/store'

const Products: FunctionComponent = () => {
  return (
    <div
      className="min-h-screen py-28 body-gutter-sm lg:body-gutter-lg
    xl:body-gutter-xl 2xl:body-gutter-2xl"
    >
      <div className="flex flex-wrap mb-10">
        <div className="flex-grow">
          <ProductsSearch />
        </div>
        <div className="w-2/5 ml-8">
          <ProductsSort />
        </div>
      </div>
      <div className="flex">
        <div className="lg:mr-8">
          <ProductsMenu />
        </div>
        <div className="flex-grow">
          <ProductsList />
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // const { locale: defaultLocale = 'en-US' } = ctx
  // console.log('store', store.getState())
  // const { products: currentProducts } = store.getState()

  const { products, locale, pageAssets, igImages, categoryAssets, categories } =
    await fetchGlobalData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories({ categories, categoryAssets, locale }))
  store.dispatch(setIgImages(igImages))

  // Products
  store.dispatch(setProducts(products))

  return {
    props: {},
  }
})

export default Products
