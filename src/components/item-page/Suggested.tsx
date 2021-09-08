import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { ProductLowercase } from '@models/ambassador'
import { selectProducts } from '@redux/productsSlice'

interface OwnProps {
  product: ProductLowercase
}

type Props = OwnProps

const Suggested: FunctionComponent<Props> = ({ product }) => {
  const { products } = useSelector(selectProducts())

  const [suggestedProducts, setSuggestedProducts] =
    useState<ProductLowercase[] | null>(null)

  const { data, type } = product
  const { category } = data

  useEffect(() => {
    // filter by type and category
    const filteredProducts = products.filter((curProduct) => {
      const { type: curType, data: curData } = curProduct
      const { category: curCategory } = curData

      return type === curType && category === curCategory
    })

    // console.log(filteredProducts)

    setSuggestedProducts(filteredProducts)
  }, [type, category, products])

  return (
    <>
      {suggestedProducts && (
        <div className="my-4">
          {/* <ProductsSlideshow */}
          {/*  products={suggestedProducts} */}
          {/*  headline="You might like" */}
          {/* /> */}
          <h2 className="uppercase text-blue-dark font-2xl">You might like</h2>
          <div>
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
    </>
  )
}

export default Suggested
