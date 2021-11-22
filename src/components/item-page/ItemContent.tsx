import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import useResizeObserver from '@react-hook/resize-observer'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import AmbassadorImage from '@components/common/AmbassadorImage'
import BuyButtonQuantity from '@components/common/buttons/BuyButtonQuantity'
import Tags from '@components/common/product/Tags'
import FactList from '@components/item-page/FactList'
import ItemSlideshow from '@components/item-page/ItemSlideshow'
import { getPriceAsString } from '@lib/getPriceAsString'
import { ProductLowercase } from '@models/ambassador'
import { selectProducts } from '@redux/productsSlice'

export interface Props {
  product: ProductLowercase
}

export type Facts = { [key: string]: string | string[] }[]

const ItemContent: FunctionComponent<Props> = ({ product }) => {
  const { missingImage } = useSelector(selectProducts())
  const [label, setLabel] = useState<string | null>(null)
  const [price, setPrice] = useState<string>('')
  const [desktopTitleHeight, setDesktopTitleHeight] = useState<number | null>(
    null
  )
  const [mobileTitleHeight, setMobileTitleHeight] = useState<number | null>(
    null
  )

  const mobileTitleRef = useRef<null | HTMLDivElement>(null)
  const desktopTitleRef = useRef<null | HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  const handleResize = useCallback(() => {
    if (isDesktop && desktopTitleRef.current) {
      const height = desktopTitleRef.current.offsetHeight
      setDesktopTitleHeight(height)
    }

    if (!isDesktop && mobileTitleRef.current) {
      const height = mobileTitleRef.current.offsetHeight
      setMobileTitleHeight(height)
    }
  }, [isDesktop])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(debounce(handleResize, 0), [])

  useResizeObserver(containerRef, debouncedResize)

  useEffect(() => {
    handleResize()
  }, [handleResize])

  useEffect(() => {
    const { data } = product
    const { variants } = data
    const [variant] = variants

    if (variant) {
      const { amount, label: primaryLabel } = variant
      setPrice(getPriceAsString(amount))
      setLabel(primaryLabel)
    }
  }, [product])

  const { _id: id, data } = product
  const {
    name: productName,
    region,
    winery,
    varietal,
    country,
    style,
    description,
    vintage,
    type,
    bottleSize,
    imageUrl,
    ABV,
    // eslint-disable-next-line camelcase
    Varietal_Text,
  } = data

  const facts = [
    { winery },
    { vintage },
    { varietal: Varietal_Text },
    { region },
    { country },
    { type },
    { ABV },
    { size: bottleSize },
  ] as Facts

  return (
    <div ref={containerRef}>
      <div
        ref={desktopTitleRef}
        className="hidden pointer-events-none lg:block relative z-10"
      >
        <h1 className="font-bold text-7xl uppercase text-blue-dark lg:max-w-2/3">
          {productName}
        </h1>
      </div>
      <div className="flex flex-col-reverse lg:flex lg:flex-row lg:justify-between">
        <div
          className="w-full py-2 lg:pb-0 lg:pt-4 lg:w-1/3 flex flex-col"
          style={{
            marginTop:
              !isDesktop && mobileTitleHeight ? -mobileTitleHeight / 2 : 0,
          }}
        >
          {winery && (
            <div className="flex mb-4 justify-center lg:justify-start">
              <span className="inline-block text-base lg:text-xl">
                <h2 className="inline uppercase font-bold">{winery}</h2>
                {vintage && (
                  <>
                    <span className="inline uppercase font-bold">
                      &nbsp;&#8226;&nbsp;
                    </span>
                    <h2 className="inline uppercase font-bold">{vintage}</h2>
                  </>
                )}
              </span>
            </div>
          )}
          <div className="mb-6 lg:mb-4">
            <Tags
              country={country}
              style={style}
              varietal={varietal}
              variant="item"
            />
          </div>
          {id && label && (
            <div className="mt-auto flex flex-col items-center lg:items-start">
              <div className="mb-2 text-blue-dark font-medium">
                <span className="text-xl">${price}</span>{' '}
                <span className="text-sm"> / per {label}</span>
              </div>
              <BuyButtonQuantity productId={id} />
            </div>
          )}
        </div>
        <div
          className="w-full lg:w-7/12 pointer-events-none"
          style={{
            marginTop:
              isDesktop && desktopTitleHeight
                ? (-desktopTitleHeight * 2) / 3
                : 0,
          }}
        >
          {imageUrl?.length > 2 ? (
            <ItemSlideshow slides={imageUrl} title={productName} />
          ) : (
            <>
              {imageUrl?.length > 0 ? (
                <div className="bg-blue-lightest pointer-events-auto p-6 h-112 xl:h-144">
                  <AmbassadorImage url={imageUrl[0]} title={productName} />
                </div>
              ) : (
                <AmbassadorImage
                  url={
                    missingImage?.url ||
                    'https://images.ctfassets.net/q0vbuozzojij/7lYYm9hx5eDUs2a0bbeB7L/513dc8bf19515816374ad5d28d864165/1.png'
                  }
                  title={missingImage?.title || 'Missing item.'}
                  imageStyle="object-cover"
                />
              )}
            </>
          )}
          <div ref={mobileTitleRef} className="transform -translate-y-1/2">
            <h1 className="font-bold pointer-events-auto text-3xl text-center uppercase text-blue-dark lg:hidden">
              {productName}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full lg:flex justify-between mt-8">
        <div className="w-full lg:w-1/3">
          <div className="">
            <FactList facts={facts} />
          </div>
        </div>
        <div className="w-full mt-8 lg:mt-0 lg:w-7/12">
          <p className="">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemContent
