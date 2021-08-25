import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import ItemBreadcrumbs from '@components/item-page/ItemBreadcrumbs'
import ItemContent from '@components/item-page/ItemContent'
import Suggested from '@components/item-page/Suggested'
import ambassador from '@lib/ambassador'
import fetchGlobalData from '@lib/fetchGlobalData'
import { Product, ProductLowercase } from '@models/ambassador'
import { setFooter, setLocale, setNav, setPages } from '@redux/globalSlice'
import {
  selectProducts,
  setAllTags,
  setCategories,
  setProducts,
} from '@redux/productsSlice'
import { setIgImages } from '@redux/socialSlice'
import { wrapper } from '@redux/store'

const Item: FunctionComponent = () => {
  const router = useRouter()
  const { name } = router.query
  const [productData, setProductData] = useState<ProductLowercase | null>(null)
  const { products } = useSelector(selectProducts())

  useEffect(() => {
    const currentProduct = products.find(
      (product) => product.data.name === name
    )

    // console.log(currentProduct)

    if (currentProduct) {
      setProductData(currentProduct)
    }
  }, [name, products])

  return (
    <div>
      {productData && (
        <div
          className="min-h-screen pt-28 body-gutter-sm lg:body-gutter-lg
    xl:body-gutter-xl 2xl:body-gutter-2xl bg-purple"
        >
          <ItemBreadcrumbs product={productData} />
          <ItemContent product={productData} />
        </div>
      )}
      {productData && <Suggested product={productData} />}{' '}
    </div>
  )
}

export const getStaticPaths = async () => {
  const { data: allShops } = await ambassador.api.allShops()

  const { shops } = allShops
  const [shop] = shops
  const { products } = shop

  const paths = products.map((product: Product) => ({
    params: {
      name: product.data.name,
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // const { locale: defaultLocale = 'en-US' } = ctx
  // console.log('store', store.getState())

  const {
    products,
    locale,
    pageAssets,
    igImages,
    categoryAssets,
    categories,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories({ categories, categoryAssets, locale }))
  store.dispatch(setIgImages(igImages))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))

  // Products
  store.dispatch(setProducts(products))

  return {
    props: {},
  }
})

export default Item
