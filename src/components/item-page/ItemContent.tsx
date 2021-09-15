import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useMediaQuery } from 'react-responsive'

import AmbassadorImage from '@components/common/AmbassadorImage'
import BuyButton from '@components/common/BuyButton'
import Tags from '@components/common/product/Tags'
import FactList from '@components/item-page/FactList'
import { ProductLowercase } from '@models/ambassador'

export interface Props {
  product: ProductLowercase
}

export type Facts = { [key: string]: string | string[] }[]

const ItemContent: FunctionComponent<Props> = ({ product }) => {
  const [label, setLabel] = useState<string | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [desktopTitleHeight, setDesktopTitleHeight] = useState<number | null>(
    null
  )
  const [mobileTitleHeight, setMobileTitleHeight] = useState<number | null>(
    null
  )

  const mobileTitleRef = useRef<null | HTMLDivElement>(null)
  const desktopTitleRef = useRef<null | HTMLDivElement>(null)

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

  useEffect(() => {
    if (window) {
      handleResize()
      window.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  useEffect(() => {
    const { data } = product
    const { variants } = data
    const [variant] = variants

    if (variant) {
      const { amount, label: primaryLabel } = variant
      setPrice(amount / 100)
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
  } = data

  const facts = [
    { winery },
    { vintage },
    { varietal },
    { region },
    { country },
    { type },
    { size: bottleSize },
  ] as Facts

  const [url] = imageUrl

  return (
    <div>
      <div ref={desktopTitleRef} className="hidden lg:block relative z-10">
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
            <div className="flex justify-center lg:justify-start">
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
          <div className="mt-8 mb-6 lg:mt-6 lg:mb-4">
            <Tags
              country={country}
              style={style}
              varietal={varietal}
              variant="primary"
            />
          </div>
          {id && label && (
            <div className="mt-auto">
              <div className="mb-2 text-blue-dark font-medium">
                <span className="text-xl">${price}</span>{' '}
                <span className="text-sm"> / per {label}</span>
              </div>
              <BuyButton productId={id} />
            </div>
          )}
        </div>
        <div
          className="w-full lg:w-7/12"
          style={{
            marginTop:
              isDesktop && desktopTitleHeight
                ? (-desktopTitleHeight * 2) / 3
                : 0,
          }}
        >
          {url && (
            <div className="bg-blue-light hover:bg-lime-background py-6 h-122 xl:h-144">
              <AmbassadorImage url={url} title={productName} />
            </div>
          )}
          <div ref={mobileTitleRef} className="transform -translate-y-1/2">
            <h1 className="font-bold text-3xl text-center uppercase text-blue-dark lg:hidden">
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
        {/* {desktopTitleHeight && ( */}
        <div className="w-full mt-8 lg:mt-0 lg:w-7/12">
          <p className="">{description}</p>
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default ItemContent
