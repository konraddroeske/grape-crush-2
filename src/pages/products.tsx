import React, { FunctionComponent, useEffect } from 'react'

import { useRouter } from 'next/router'
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
import client from '@lib/apolloClient'
import fetchGlobalData from '@lib/fetchGlobalData'
import { ProductLowercase } from '@models/ambassador'
import { Asset } from '@models/contentful-graph'
import { assetCollectionQuery } from '@models/schema'
import { selectGlobal } from '@redux/globalSlice'

import {
  handlePage,
  handleTags,
  resetTags,
  selectProducts,
  setAllTags,
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
  const router = useRouter()
  const { mobileMenuOpen } = useSelector(selectProducts())

  useEffect(() => {
    dispatch(setMissingImage(missingImage))
    dispatch(setAllTags(products))
    dispatch(setProducts(products))
  }, [dispatch, products, missingImage])

  useEffect(() => {
    if (Object.values(router.query).length > 0) {
      const { page: queryPage, ...newTags } = router.query

      if (queryPage && !(queryPage instanceof Array)) {
        dispatch(handlePage(parseInt(queryPage, 10)))
      }

      const newTagsFlat = Object.values(newTags).flat()

      if (newTagsFlat.length > 0) {
        dispatch(handleTags(newTags))
      }
    } else {
      dispatch(resetTags())
    }
  }, [router, dispatch])

  const { isSticky } = useSelector(selectGlobal())

  return (
    <>
      <Seo title="Shop" />
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
  // const { locale: defaultLocale = 'en-US' } = ctx
  // console.log('store', store.getState())
  // const { products: currentProducts } = store.getState()

  const { products } = await fetchGlobalData(store)

  const { data: missingImageData } = await client.query({
    query: assetCollectionQuery,
    variables: {
      assetCollectionWhere: {
        title_contains: 'missing',
      },
    },
  })

  const { assetCollection } = missingImageData

  const { items } = assetCollection
  const missingImage = items.find((image: Asset) =>
    image.title.toLowerCase().includes('light')
  )

  // Products
  return {
    props: { products, missingImage },
    revalidate: 10,
  }
})

export default Products
