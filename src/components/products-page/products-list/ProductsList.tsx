import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ProductCard from '@components/common/product/ProductCard'

import NoItems from '@components/products-page/products-list/NoItems'
import PageNav from '@components/products-page/products-list/PageNav'
import { handleProducts, selectProducts } from '@redux/productsSlice'

const ProductsList: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { selectedProducts, page, selectedTags, productsSearch, productsSort } =
    useSelector(selectProducts())

  useEffect(() => {
    dispatch(handleProducts({ selectedTags, productsSearch, productsSort }))
  }, [selectedTags, productsSearch, productsSort, page, dispatch])

  return (
    <div className="flex flex-col h-full">
      {selectedProducts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
          {selectedProducts.map((product) => {
            const { data } = product
            return (
              <li key={product._id}>
                <ProductCard id={product._id} data={data} />
              </li>
            )
          })}
        </ul>
      ) : (
        <NoItems />
      )}
      <div className="mt-auto">
        <PageNav />
      </div>
    </div>
  )
}

export default ProductsList
