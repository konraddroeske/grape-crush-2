import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import ShadowButton from '@components/common/ShadowButton'
import NavSearch from '@components/nav-bar/NavSearch'
import { CmsImage } from '@lib/cms'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

import NavWave from '../../assets/svgs/nav-wave.svg'

const DesktopCategories: FunctionComponent = () => {
  const { locale, nav } = useSelector(selectGlobal())
  const { categories, allTags } = useSelector(selectProducts())
  const [topStyles, setTopStyles] = useState<string[]>([])
  const [categoryImage, setCategoryImage] =
    useState<string | undefined>(undefined)
  const [svgMask, setSvgMask] = useState<CmsImage | null>(null)

  useEffect(() => {
    const [defaultCategory] = categories

    if (defaultCategory) {
      setCategoryImage(defaultCategory?.image?.file?.[locale]?.url)
    }
  }, [categories, locale])

  useEffect(() => {
    if (nav) {
      const [data] = nav
      const { image: svgData } = data

      if (!svgData) return

      setSvgMask(svgData)
    }
  }, [nav])

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

  const handleHover = (url: string | undefined) => {
    if (url && url !== categoryImage) {
      setCategoryImage(url)
    }
  }

  return (
    <div
      className="fixed -z-10 top-0 left-0 right-0 pt-20 flex justify-between flex-wrap
      bg-blue-dark lg:body-gutter-lg xl:body-gutter-xl"
    >
      <div className="flex w-1/2 justify-between">
        <div className="mr-8">
          <h3 className="text-left text-xl text-lime font-bold uppercase">
            By Type
          </h3>
          <ul className="">
            {categories.map((category) => {
              return (
                <li
                  key={category.id}
                  onMouseEnter={() =>
                    handleHover(category?.image?.file?.[locale]?.url)
                  }
                >
                  <h4
                    className="text-left text-sm text-white font-medium
                  uppercase mt-2 lg:text-base"
                  >
                    {category.title[locale]}
                  </h4>
                </li>
              )
            })}
          </ul>
        </div>
        {svgMask && (
          <div
            className="mask-test"
            style={{
              backgroundImage: `url(${categoryImage})`,
              maskImage: `url(https:${svgMask.file[locale].url})`,
              WebkitMaskImage: `url(https:${svgMask.file[locale].url})`,
            }}
          />
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-left text-xl text-lime font-bold uppercase">
          By Style
        </h3>
        <ul className="grid grid-cols-2">
          {topStyles.length > 0 &&
            topStyles.slice(0, 12).map((style) => {
              return (
                <li
                  key={style}
                  className="text-left text-sm font-medium
                  uppercase mt-2 lg:text-base"
                >
                  <h4 className="text-white">{style}</h4>
                </li>
              )
            })}
        </ul>
      </div>
      <div className="w-full flex justify-between mt-8 mb-4">
        <div className="w-2/5">
          <ShadowButton text="Shop All Wines" variant="nav" />
        </div>
        <div className="w-1/2">
          <NavSearch variant="desktop" />
        </div>
      </div>
      <NavWave className="absolute left-0 top-full w-full" />
    </div>
  )
}

export default DesktopCategories
