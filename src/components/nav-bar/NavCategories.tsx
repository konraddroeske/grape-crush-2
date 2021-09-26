import React, { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import ShadowLink from '@components/common/ShadowLink'
import NavSearch from '@components/nav-bar/NavSearch'
import { Asset } from '@models/contentful-graph'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const NavCategories: FunctionComponent = () => {
  const { categories, allTags } = useSelector(selectProducts())
  const { nav } = useSelector(selectGlobal())
  const router = useRouter()

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

  const handleClick = (newCategory: string, newTag: string) => {
    const isProductPage = router.pathname === '/products'

    const href = `/products/?${encodeURIComponent(
      newCategory
    )}=${encodeURIComponent(newTag)}`
    router
      .push(href, href, { shallow: isProductPage })
      .then(() => window.scrollTo(0, 0))
  }

  return (
    <div
      className="w-full my-4 lg:my-0 lg:pt-20 flex justify-between flex-wrap
    bg-blue-dark lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl"
    >
      <div
        className="flex w-full lg:w-1/2 justify-between pb-4 mb-4 border-b
      border-lime lg:pb-0 lg:mb-0 lg:border-b-0"
      >
        <div className="mr-8">
          <h3 className="text-left text-xl sm:text-2xl sm:pb-1 text-lime font-bold uppercase">
            By Type
          </h3>
          <ul className="">
            {categories.map((category) => {
              return (
                <li
                  key={category.categoryName}
                  onMouseEnter={() => handleHover(category?.image?.url)}
                >
                  <button
                    type="button"
                    className="leading-5 py-1 sm:py-2 text-left text-base text-white font-medium uppercase"
                    onClick={() =>
                      handleClick('parentType', category.categoryName)
                    }
                  >
                    {category.title}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex-grow relative">
          {svgMask && (
            <div
              className="mask-nav absolute left-0 top-0 w-full min-w-64"
              style={{
                backgroundImage: `url(${categoryImage})`,
                maskImage: `url(${svgMask.url})`,
                WebkitMaskImage: `url(${svgMask.url})`,
              }}
            />
          )}
        </div>
      </div>
      <div className="flex-grow border-b border-lime pb-4 lg:border-b-0 lg:pb-0">
        <h3 className="text-left text-xl sm:text-2xl sm:pb-1 text-lime font-bold uppercase">
          By Style
        </h3>
        <ul className="grid grid-cols-2 gap-x-3">
          {topStyles.length > 0 &&
            topStyles.slice(0, 12).map((style) => {
              return (
                <li key={style} className="">
                  <button
                    type="button"
                    className="leading-5 py-1 sm:py-2 text-white text-left text-base font-medium uppercase"
                    onClick={() => handleClick('style', style)}
                  >
                    {style}
                  </button>
                </li>
              )
            })}
        </ul>
      </div>
      <div className="hidden w-full lg:flex justify-between mt-8 mb-4">
        <div className="flex w-2/5">
          <Link href="/products">
            <a>
              <ShadowLink variant="nav">Show All Wines</ShadowLink>
            </a>
          </Link>
        </div>
        <div className="w-1/2">
          <NavSearch variant="desktop" />
        </div>
      </div>
    </div>
  )
}

export default NavCategories
