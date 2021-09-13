import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Search from '@assets/svgs/search.svg'
import { selectClient, setNavSearch } from '@redux/clientSlice'
import { handleProductsSearch, selectProducts } from '@redux/productsSlice'

const ProductsSearch: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { navSearch } = useSelector(selectClient())
  const { productsSearch } = useSelector(selectProducts())

  useEffect(() => {
    if (navSearch.length > 0) {
      // console.log(navSearch)
      dispatch(handleProductsSearch(navSearch))
    }
    dispatch(setNavSearch(''))
  }, [dispatch, navSearch])

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(handleProductsSearch(event.currentTarget.value))
  }

  return (
    <div className="relative flex h-7 bg-lime-light">
      <input
        type="text"
        placeholder="Search"
        className="w-full border-none bg-transparent font-bold placeholder-transparent py-0 pr-8"
        value={productsSearch}
        onChange={handleChange}
      />
      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5" />
    </div>
  )
}

export default ProductsSearch
