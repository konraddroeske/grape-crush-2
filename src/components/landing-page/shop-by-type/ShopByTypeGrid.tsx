import React, { FunctionComponent } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import OutlineMarquee from '@components/common/OutlineMarquee'
import ShadowLink from '@components/common/ShadowLink'
import { selectProducts } from '@redux/productsSlice'

const ShopByTypeGrid: FunctionComponent = () => {
  const { categories } = useSelector(selectProducts())
  return (
    <section className="section-margin">
      <OutlineMarquee text="Shop by type" />
      <ul
        className="mt-12 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 2xl:grid-cols-4 gap-6 sm:gap-8 2xl:gap-12
      body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl"
      >
        {categories.map((category) => {
          return (
            <li key={category.categoryName} className="w-full">
              <Link href={category.link}>
                <a>
                  <div className="relative flex shadow-blue-dark lg:shadow-blue-dark-lg">
                    {category.image && (
                      <ContentfulImage image={category.image} />
                    )}
                  </div>
                  <div
                    className="mt-3 mx-auto text-lg xl:text-xl text-center
                  text-blue-dark font-bold uppercase lg:text-lg xl:text-xl 2xl:text-2xl"
                  >
                    {category.title}
                  </div>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="flex justify-center mt-8 lg:mt-10 xl:mt-12 2xl:mt-14 mb-12 lg:mb-20">
        <Link href="/products">
          <a>
            <ShadowLink>Shop all wines</ShadowLink>
          </a>
        </Link>
      </div>
      <OutlineMarquee text="Shop by type" direction="-=" />
    </section>
  )
}

export default ShopByTypeGrid
