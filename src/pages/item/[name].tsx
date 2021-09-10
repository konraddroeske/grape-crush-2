import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
import ItemBar from '@components/item-page/item-bar/ItemBar'
import ItemContent from '@components/item-page/ItemContent'
import fetchGlobalData from '@lib/fetchGlobalData'
import { ProductLowercase } from '@models/ambassador'
import { setFooter, setLocale, setNav, setPages } from '@redux/globalSlice'
import {
  selectProducts,
  setAllTags,
  setCategories,
  setProducts,
} from '@redux/productsSlice'
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

    if (currentProduct) {
      setProductData(currentProduct)
    }
  }, [name, products])

  return (
    <div className="min-h-screen py-12 pb-28">
      <div className="my-4 overflow-hidden">
        <OutlineMarquee text="shop" />
      </div>
      {productData && (
        <>
          <div className="mb-4 lg:mb-10 lg:border lg:border-l-0 lg:border-r-0 border-dark-blue">
            <ItemBar product={productData} />
          </div>
          <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl bg-purple">
            <ItemContent product={productData} />
          </div>
          {/* <Suggested product={productData} /> */}
        </>
      )}
    </div>
  )
}

// export const getStaticPaths = async () => {
//   const { data: allShops } = await ambassador.api.allShops()
//
//   const { shops } = allShops
//   const [shop] = shops
//   const { products } = shop
//
//   const paths = products.map((product: Product) => ({
//     params: {
//       name: product.data.name,
//     },
//   }))
//
//   return { paths, fallback: false }
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const {
      products,
      locale,
      pageAssets,
      categoryAssets,
      footerAssets,
      navAssets,
    } = await fetchGlobalData()

    // Global
    store.dispatch(setAllTags(products))
    store.dispatch(setLocale(locale))
    store.dispatch(setPages(pageAssets))
    store.dispatch(setCategories(categoryAssets))
    store.dispatch(setFooter(footerAssets))
    store.dispatch(setNav(navAssets))

    // Products
    store.dispatch(setProducts(products))

    return {
      props: {},
    }
  }
)

export default Item
