import React, { FunctionComponent } from 'react'

import Categories from '@components/common/Categories'
import RoundedButton from '@components/common/RoundedButton'

const ShopByType: FunctionComponent = () => {
  return (
    <section
      className="flex flex-col bg-lime-light pt-4 pb-10 body-gutter-sm
    lg:body-gutter-lg xl:body-gutter-xl"
    >
      <h3 className="text-3xl font-bold center text-blue text-center uppercase">
        Shop By Type
      </h3>
      <Categories />
      <RoundedButton variant="md">Shop All</RoundedButton>
    </section>
  )
}

export default ShopByType
