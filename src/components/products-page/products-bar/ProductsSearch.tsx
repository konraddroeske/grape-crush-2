import React, { FunctionComponent, useState } from 'react'

import { useDispatch } from 'react-redux'

import Search from '@assets/svgs/search.svg'
import { handleProductsSearch } from '@redux/productsSlice'

const ProductsSearch: FunctionComponent = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>('')

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
    dispatch(handleProductsSearch(event.currentTarget.value))
  }

  return (
    <div className="relative flex h-7 bg-lime-light">
      <input
        type="text"
        placeholder="Search"
        className="border-none bg-transparent font-bold placeholder-transparent py-0 pr-8"
        value={search}
        onChange={handleChange}
      />
      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5" />
    </div>
  )
}

export default ProductsSearch
