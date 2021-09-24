import React, { FunctionComponent, useEffect } from 'react'

import axios from 'axios'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import useSwr from 'swr'

import ClientOnlyPortal from '@components/common/ClientOnlyPortal'
import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import ProductsBar from '@components/products-page/products-bar/ProductsBar'
import ProductsBreadcrumbs from '@components/products-page/products-bar/ProductsBreadcrumbs'
import ProductsList from '@components/products-page/products-list/ProductsList'
import DesktopMenu from '@components/products-page/products-menu/DesktopMenu'
import MobileMenu from '@components/products-page/products-menu/MobileMenu'
import { addPriceRange } from '@lib/addPriceRange'
import { cleanData } from '@lib/cleanData'
import fetchGlobalData from '@lib/fetchGlobalData'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'

import {
  handlePage,
  handleTags,
  resetTags,
  selectProducts,
  setAllTags,
  setCategories,
  setProducts,
} from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Products: FunctionComponent = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { mobileMenuOpen } = useSelector(selectProducts())

  axios.defaults.baseURL = 'https://dashboard.ambassador.ai/data/v1/'
  axios.defaults.headers.common.Authorization =
    process.env.NEXT_PUBLIC_BEARER_TOKEN

  // console.log(process.env.NEXT_PUBLIC_BEARER_TOKEN)
  const fetcher = (url: string) => axios.get(url).then((res) => res)
  const { data: productsData } = useSwr('/shops', fetcher)
  //

  useEffect(() => {
    if (productsData) {
      // console.log(productsData.data)
      const [shop] = productsData.data.data.shops
      const { products } = shop

      const productsWithPriceRange = addPriceRange(products)
      const productsWithNewKeys = cleanData(productsWithPriceRange)
      // console.log(productsWithNewKeys)

      dispatch(setAllTags(productsWithNewKeys))
      dispatch(setProducts(productsWithNewKeys))
    }
  }, [dispatch, productsData])

  useEffect(() => {
    if (Object.values(router.query).length > 0) {
      const { page, ...tags } = router.query

      if (page && !(page instanceof Array)) {
        dispatch(handlePage(parseInt(page, 10)))
      }

      dispatch(handleTags(tags))
    } else {
      dispatch(resetTags())
    }
  }, [router, dispatch])

  useEffect(() => {
    if (mobileMenuOpen) {
      const body = document.getElementsByTagName('BODY')[0]
      disableBodyScroll(body)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [mobileMenuOpen])

  // if (error) return <div>failed to load</div>
  // if (!productsData) return <div>loading...</div>

  return (
    <>
      <Seo title="Shop" />
      {productsData && (
        <div className="py-12 pb-12">
          <div className="my-4 overflow-hidden">
            <OutlineMarquee text="shop" />
          </div>
          <div className="lg:mb-10 border border-l-0 border-r-0 border-dark-blue">
            <ProductsBar />
          </div>
          <div className="my-4 body-gutter-sm lg:hidden">
            <ProductsBreadcrumbs />
          </div>
          <div className="flex">
            <DesktopMenu />
            <div className="flex-grow body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
              <ProductsList />
            </div>
          </div>
          {mobileMenuOpen && (
            <ClientOnlyPortal selector="#modal">
              <MobileMenu />
            </ClientOnlyPortal>
          )}
        </div>
      )}{' '}
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // const { locale: defaultLocale = 'en-US' } = ctx
  // console.log('store', store.getState())
  // const { products: currentProducts } = store.getState()

  const {
    // products,
    locale,
    heroAssets,
    pageAssets,
    categoryAssets,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  // Global
  // store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))
  store.dispatch(setHeroSlides(heroAssets))

  // Products
  // store.dispatch(setProducts(products))

  return {
    props: {},
  }
})

export default Products
