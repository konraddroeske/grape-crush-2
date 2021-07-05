import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import RoundedButton from '@components/common/RoundedButton'
import SearchBar from '@components/nav-bar/SearchBar'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

import MenuBottle from '../../assets/svgs/menu-bottle.svg'
import NavWave from '../../assets/svgs/nav-wave.svg'

const DesktopCategories: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { categories, styles } = useSelector(selectProducts())
  const [topStyles, setTopStyles] = useState<string[]>([])

  useEffect(() => {
    if (styles) {
      const sortedStyles = Object.entries(styles)
        .sort((a, b) => {
          return b[1] - a[1]
        })
        .map((style) => style[0])

      setTopStyles(sortedStyles)
    }
  }, [styles])

  return (
    <div
      className="fixed -z-10 top-0 left-0 right-0 pt-20 flex justify-between flex-wrap
      bg-gray-lightest lg:body-gutter-lg xl:body-gutter-xl"
    >
      <div className="flex w-2/5">
        <div className="mr-8">
          <h3 className="text-left text-xl font-bold uppercase">By Type</h3>
          <ul className="">
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <h4 className="text-base text-left text-sm font-medium uppercase mt-2 sm:mt-4 lg:mt-4">
                    {category.title[locale]}
                  </h4>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex items-center flex-grow">
          <MenuBottle />
        </div>
      </div>
      <div className="w-1/2">
        <h3 className="text-left text-xl font-bold uppercase">By Style</h3>
        <ul className="grid grid-cols-2">
          {topStyles.length > 0 &&
            topStyles.slice(0, 12).map((style) => {
              return (
                <li
                  key={style}
                  className="text-base text-left text-sm font-medium
                  uppercase mt-2 sm:mt-4 lg:mt-4"
                >
                  <h4>{style}</h4>
                </li>
              )
            })}
        </ul>
      </div>
      <div className="w-full flex justify-between mt-8 mb-4">
        <div className="w-2/5">
          <RoundedButton variant="full" marginY="my-0">
            Shop All Wines
          </RoundedButton>
        </div>
        <div className="w-1/2">
          <SearchBar variant="desktop" />
        </div>
      </div>
      <NavWave className="absolute left-0 top-full w-full" />
    </div>
  )
}

export default DesktopCategories
