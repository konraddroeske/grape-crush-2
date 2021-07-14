import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ProductCard from '@components/common/product/ProductCard'

import { selectProducts } from '@redux/productsSlice'

const ProductsList: FunctionComponent = () => {
  const { products } = useSelector(selectProducts())

  const initial = products.slice(0, 10)
  // console.log(initial)

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {initial.slice(0, 10).map((product) => {
          const { data } = product
          return (
            <li key={product._id}>
              <ProductCard id={product._id} data={data} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProductsList
