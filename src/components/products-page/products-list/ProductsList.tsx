import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import Product from '@components/products-page/products-list/Product'
import { selectProducts } from '@redux/productsSlice'

const ProductsList: FunctionComponent = () => {
  const { products } = useSelector(selectProducts())

  const initial = products.slice(0, 10)
  // console.log(initial)

  return (
    <div>
      <h2>Products List</h2>
      {initial.slice(0, 10).map((product) => {
        const { data } = product
        return (
          <li key={product._id}>
            <Product data={data} />
          </li>
        )
      })}
    </div>
  )
}

export default ProductsList
