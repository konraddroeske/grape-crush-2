import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/dist/client/router'
import { useDispatch, useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import ItemBar from '@components/item-page/item-bar/ItemBar'
import ItemContent from '@components/item-page/ItemContent'
import useRouterScrollUpdate from '@hooks/useRouterScrollUpdate'
import ambassador from '@lib/ambassador'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchMissingImage from '@lib/fetchMissingImage'
import { Product, ProductLowercase } from '@models/ambassador'

import { Asset } from '@models/contentful-graph'
import { selectGlobal, setPageProductData } from '@redux/globalSlice'
import { setMissingImage, setProducts } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

interface Props {
  products: ProductLowercase[]
  missingImage: Asset
}

const Item: FunctionComponent<Props> = ({ products, missingImage }) => {
  useRouterScrollUpdate()
  const dispatch = useDispatch()
  const router = useRouter()
  const { pageProductData } = useSelector(selectGlobal())

  const [dimensions, setDimensions] = useState<{
    height: number
    width: number
  } | null>(null)

  useEffect(() => {
    dispatch(setMissingImage(missingImage))
    dispatch(setProducts(products))
  }, [dispatch, products, missingImage])

  useEffect(() => {
    if (pageProductData) {
      const img = new Image()
      // eslint-disable-next-line prefer-destructuring
      img.src = pageProductData.data.imageUrl[0]
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
  }, [pageProductData])

  return (
    <>
      {pageProductData && (
        <Seo
          title={pageProductData?.data.name}
          canonical={`https://www.grapecrush.wine${router.asPath}`}
          description={pageProductData?.data.description}
          image={{
            title: pageProductData.data.name,
            url: pageProductData?.data.imageUrl[0],
            description: pageProductData?.data.description,
            width: dimensions?.width || 500,
            height: dimensions?.height || 500,
          }}
        />
      )}
      <div className="min-h-screen py-12 pb-28">
        <div className="my-4 overflow-hidden">
          <OutlineMarquee text="shop" />
        </div>
        {pageProductData && (
          <>
            <div className="mb-4 lg:mb-10 lg:border lg:border-l-0 lg:border-r-0 border-dark-blue">
              <ItemBar product={pageProductData} />
            </div>
            <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl bg-purple">
              <ItemContent product={pageProductData} />
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
      name: encodeURIComponent(product.data.name),
    },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const { products } = await fetchGlobalData(store)
    const name = context?.params?.name as string

    const currentProduct = products.find(
      (product) => product.data.name === decodeURIComponent(name)
    )

    if (!currentProduct) {
      return {
        notFound: true,
      }
    }

    store.dispatch(setPageProductData(currentProduct || null))
    const missingImage = await fetchMissingImage()

    return {
      props: {
        products,
        missingImage,
      },
      revalidate: 60,
    }
  }
)

export default Item
