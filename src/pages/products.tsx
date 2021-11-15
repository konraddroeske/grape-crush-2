import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ClientOnlyPortal from '@components/common/ClientOnlyPortal'
import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import ProductsBar from '@components/products-page/products-bar/ProductsBar'
import ProductsBreadcrumbs from '@components/products-page/products-bar/ProductsBreadcrumbs'
import ProductsList from '@components/products-page/products-list/ProductsList'
import DesktopMenu from '@components/products-page/products-menu/DesktopMenu'
import MobileMenu from '@components/products-page/products-menu/MobileMenu'
import useRouterScrollUpdate from '@hooks/useRouterScrollUpdate'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchMissingImage from '@lib/fetchMissingImage'
import { ProductLowercase } from '@models/ambassador'
import { Asset } from '@models/contentful-graph'
import { selectGlobal } from '@redux/globalSlice'

import {
  selectProducts,
  setAllTags,
  setMaxPrice,
  setMissingImage,
  setProducts,
} from '@redux/productsSlice'
import { wrapper } from '@redux/store'

interface Props {
  products: ProductLowercase[]
  missingImage: Asset
}

const Products: FunctionComponent<Props> = ({ products, missingImage }) => {
  useRouterScrollUpdate()
  const dispatch = useDispatch()
  const { mobileMenuOpen } = useSelector(selectProducts())
  const { isSticky } = useSelector(selectGlobal())

  useEffect(() => {
    dispatch(setMissingImage(missingImage))
    dispatch(setAllTags(products))
    dispatch(setMaxPrice(products))
    dispatch(setProducts(products))
  }, [dispatch, products, missingImage])

  // const warningVisible =
  //   selectedProductsByPage.length === 0 &&
  //   (totalSelectedTags > 0 || productsSearch.length > 0)

  return (
    <>
      <Seo title="Shop" canonical="https://www.grapecrush.wine/products" />
      <div className="flex flex-col py-12 pb-12 min-h-screen">
        <div
          className={`${
            isSticky ? 'opacity-0' : 'opacity-1'
          } transition duration-1000 my-4 overflow-hidden`}
        >
          <OutlineMarquee text="shop" />
        </div>
        <div className="lg:mb-10">
          <ProductsBar />
        </div>
        <div className="my-4 body-gutter-sm lg:hidden">
          <ProductsBreadcrumbs variant="mobile" />
        </div>
        <div className="flex flex-grow">
          <DesktopMenu />
          <div className="w-full px-2 sm:body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
            <ProductsList />
          </div>
        </div>
        {mobileMenuOpen && (
          <ClientOnlyPortal selector="#modal">
            <MobileMenu />
          </ClientOnlyPortal>
        )}
      </div>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { products } = await fetchGlobalData(store)
  const missingImage = await fetchMissingImage()

  return {
    props: { products, missingImage },
    revalidate: 10,
  }
})

export default Products
