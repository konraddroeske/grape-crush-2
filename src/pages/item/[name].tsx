import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import ItemBar from '@components/item-page/item-bar/ItemBar'
import ItemContent from '@components/item-page/ItemContent'
import ambassador from '@lib/ambassador'
import fetchGlobalData from '@lib/fetchGlobalData'
import { Product, ProductLowercase } from '@models/ambassador'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
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
  const [dimensions, setDimensions] = useState<{
    height: number
    width: number
  } | null>(null)
  const { products } = useSelector(selectProducts())

  useEffect(() => {
    const currentProduct = products.find(
      (product) => product.data.name === name
    )

    if (currentProduct) {
      setProductData(currentProduct)
    }
  }, [name, products])

  useEffect(() => {
    if (productData) {
      const img = new Image()
      // eslint-disable-next-line prefer-destructuring
      img.src = productData.data.imageUrl[0]
      img.onload = (data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { naturalWidth, naturalHeight } = data.path[0]

        if (naturalWidth && naturalHeight) {
          setDimensions({
            width: naturalWidth,
            height: naturalHeight,
          })
        }
      }
    }
  }, [productData])

  return (
    <>
      <Seo
        title={productData?.data.name || 'Wines Within Reach'}
        image={
          productData && dimensions
            ? {
                url: productData?.data.imageUrl[0],
                alt: productData?.data.description,
                width: dimensions.width,
                height: dimensions.height,
              }
            : undefined
        }
      />
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
    </>
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
  const {
    products,
    locale,
    heroAssets,
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
  store.dispatch(setHeroSlides(heroAssets))

  // Products
  store.dispatch(setProducts(products))

  return {
    props: {},
  }
})

export default Item
