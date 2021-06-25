import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import RoundedButton from '@components/common/RoundedButton'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const ShopByType: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { categories } = useSelector(selectProducts())

  return (
    <section className="flex flex-col bg-lime-light pt-4 pb-10">
      <h3 className="text-3xl font-bold center text-blue text-center uppercase">
        Shop By Type
      </h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 body-gutter-sm my-6 sm:my-8 lg:my-12">
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <div className="flex">
                <img
                  className="object-cover w-full"
                  src={category.image.file[locale].url}
                  alt=""
                />
              </div>
              <h4 className="title text-base text-center text-blue text-sm font-bold uppercase mt-2 sm:mt-4 lg:mt-6">
                {category.title[locale]}
              </h4>
            </li>
          )
        })}
      </ul>
      <RoundedButton variant="md">Shop All</RoundedButton>
    </section>
  )
}

export default ShopByType
