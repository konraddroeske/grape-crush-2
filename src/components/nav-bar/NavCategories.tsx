import React, { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import ShadowLink from '@components/common/ShadowLink'
import SvgPreview from '@components/nav-bar/SvgPreview'
import { Asset } from '@models/contentful-graph'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const NavCategories: FunctionComponent = () => {
  const { categories, allTags } = useSelector(selectProducts())
  const { nav } = useSelector(selectGlobal())

  const [categoryImage, setCategoryImage] = useState<string | undefined>(
    undefined
  )
  const [svgMask, setSvgMask] = useState<Asset | null>(null)

  const [topStyles, setTopStyles] = useState<string[]>([])

  const handleHover = (url: string | undefined) => {
    if (url && url !== categoryImage) {
      setCategoryImage(url)
    }
  }

  useEffect(() => {
    const [defaultCategory] = categories

    if (defaultCategory) {
      setCategoryImage(defaultCategory.image.url)
    }
  }, [categories])

  useEffect(() => {
    // console.log(allTags)
    if (allTags) {
      const { style } = allTags

      const sortedStyles = Object.entries(style)
        .sort((a, b) => {
          return b[1] - a[1]
        })
        .map((tag) => tag[0])

      setTopStyles(sortedStyles)
    }
  }, [allTags])

  useEffect(() => {
    if (nav) {
      const [data] = nav
      const { image: svgData } = data

      if (!svgData) return

      setSvgMask(svgData)
    }
  }, [nav])

  return (
    <div
      className="w-full my-4 lg:my-0 lg:pt-20
    bg-blue-dark lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl"
    >
      <div className="flex w-full flex-wrap max-w-screen-2xl mx-auto">
        <div
          className="flex w-full lg:w-1/2 justify-between pb-4 pr-4 mb-4 border-b
      border-lime lg:pb-0 lg:mb-0 lg:border-b-0"
        >
          <div className="">
            <h3 className="text-left text-xl sm:text-2xl pb-1 text-lime font-bold uppercase">
              By Type
            </h3>
            <ul className="grid grid-col-1 gap-3">
              {categories.map((category) => {
                return (
                  <li
                    key={category.categoryName}
                    onMouseEnter={() => handleHover(category?.image?.url)}
                  >
                    <Link href={category.link}>
                      <a>
                        <div className="leading-5 text-left text-base text-white hover:text-lime font-medium uppercase">
                          {category.title}
                        </div>
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="flex justify-start w-full mt-5 mb-2 lg:hidden">
              <Link href="/products">
                <a>
                  <ShadowLink variant="nav">Shop All Wines</ShadowLink>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex-grow relative pointer-events-none">
            {svgMask && categoryImage && (
              <SvgPreview categoryImage={categoryImage} svgMask={svgMask} />
            )}
          </div>
        </div>
        <div className="flex-grow border-b border-lime pb-4 lg:border-b-0 lg:pb-0">
          <h3 className="text-left text-xl sm:text-2xl pb-1 text-lime font-bold uppercase">
            By Style
          </h3>
          <ul className="grid grid-cols-2 gap-3">
            {topStyles.length > 0 &&
              topStyles.slice(0, 14).map((style) => {
                return (
                  <li key={style} className="">
                    <Link href={`/products?style=${encodeURIComponent(style)}`}>
                      <a>
                        <div
                          className="leading-5 text-white hover:text-lime
                    text-left text-base font-medium uppercase"
                        >
                          {style}
                        </div>
                      </a>
                    </Link>
                  </li>
                )
              })}
          </ul>
          <div
            className="hidden lg:mt-5 lg:flex lg:ml-1/2 lg:w-1/2
          lg:justify-start lg:transform lg:translate-x-1.5"
          >
            <Link href="/products">
              <a>
                <ShadowLink variant="nav">Shop All Wines</ShadowLink>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavCategories
