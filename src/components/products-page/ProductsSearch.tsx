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
    <div className="flex h-10">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-light flex-grow min-w-0 bg-transparent
            rounded-l-3xl placeholder-gray-dark text-xs pl-4 pr-2 py-2
            border-r-transparent"
        value={search}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="relative flex justify-center items-center flex-none border bg-blue
        border-blue rounded-r-3xl w-14 text-lime uppercase font-bold text-xs
        border-l-transparent"
      >
        <Search className="w-6" />
      </button>
    </div>
  )
}

export default ProductsSearch
