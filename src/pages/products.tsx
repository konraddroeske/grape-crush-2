import React, { FunctionComponent } from 'react'

import ProductsList from '@components/products-page/products-list/ProductsList'
import Menu from '@components/products-page/selection-menu/Menu'
import fetchGlobalData from '@lib/fetchGlobalData'
import { setLocale, setPages } from '@redux/globalSlice'
import { setAllTags, setCategories, setProducts } from '@redux/productsSlice'
import { setIgImages } from '@redux/socialSlice'
import { wrapper } from '@redux/store'

const Products: FunctionComponent = () => {
  // const router = useRouter()
  // const dispatch = useDispatch()
  //
  // useEffect(() => {
  //   if (Object.values(router.query).length > 0) {
  //     dispatch(handleTags(router.query))
  //   } else {
  //     dispatch(resetTags())
  //   }
  // }, [router, dispatch])

  return (
    <div
      className="flex min-h-screen py-28 body-gutter-sm lg:body-gutter-lg
    xl:body-gutter-xl 2xl:body-gutter-2xl"
    >
      <div className="mr-12">
        <Menu />
      </div>
      <div className="flex-grow">
        <ProductsList />
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
