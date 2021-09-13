import React, { FunctionComponent, useEffect } from 'react'

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { useSelector } from 'react-redux'

import ClientOnlyPortal from '@components/common/ClientOnlyPortal'
import OutlineMarquee from '@components/common/OutlineMarquee'
import ProductsBar from '@components/products-page/products-bar/ProductsBar'
import ProductsList from '@components/products-page/products-list/ProductsList'
import DesktopMenu from '@components/products-page/products-menu/DesktopMenu'
import MobileMenu from '@components/products-page/products-menu/MobileMenu'
import fetchGlobalData from '@lib/fetchGlobalData'
import { setFooter, setLocale, setNav, setPages } from '@redux/globalSlice'
import {
  selectProducts,
  setAllTags,
  setCategories,
  setProducts,
} from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Products: FunctionComponent = () => {
  const { mobileMenuOpen } = useSelector(selectProducts())

  useEffect(() => {
    if (mobileMenuOpen) {
      const body = document.getElementsByTagName('BODY')[0]
      disableBodyScroll(body)
    } else {
      clearAllBodyScrollLocks()
    }
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen py-12 pb-28">
      <div className="my-4 overflow-hidden">
        <OutlineMarquee text="shop" />
      </div>
      <div className="mb-10 border border-l-0 border-r-0 border-dark-blue">
        <ProductsBar />
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
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // const { locale: defaultLocale = 'en-US' } = ctx
  // console.log('store', store.getState())
  // const { products: currentProducts } = store.getState()

  const {
    products,
    locale,
    pageAssets,
    // igImages,
    categoryAssets,
    // categories,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  // store.dispatch(setIgImages(igImages))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))

  // Products
  store.dispatch(setProducts(products))

  return {
    props: {},
  }
})

export default Products
