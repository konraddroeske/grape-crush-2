import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ProductCard from '@components/product-card/ProductCard'
import { selectProducts } from '@redux/productsSlice'

const NewArrivals: FunctionComponent = () => {
  const { newArrivals } = useSelector(selectProducts())

  // console.log(newArrivals)

  return (
    <section>
      <ul>
        {newArrivals.products.map((product) => {
          return (
            <li key={product.link}>
              <ProductCard product={product} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default NewArrivals
