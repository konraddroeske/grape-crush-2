import React, { FunctionComponent, useState } from 'react'

import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import Search from '@assets/svgs/search.svg'
import { setNavSearch } from '@redux/clientSlice'

const ItemSearch: FunctionComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>('')

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(setNavSearch(search))
    setSearch('')
    router
      .push('/products', '/products', {
        shallow: true,
      })
      .then(() => window.scrollTo(0, 0))
  }

  return (
    <form
      className="relative flex h-7 bg-lime-light"
      onSubmit={(event) => handleSearch(event)}
    >
      <label htmlFor="itemSearchField" className="sr-only">
        Search
      </label>
      <input
        id="itemSearchField"
        type="text"
        placeholder="Search"
        className="w-full border-none bg-transparent font-bold placeholder-transparent py-0 pr-8"
        value={search}
        onChange={handleChange}
      />
      <label htmlFor="itemSearchSubmit" className="sr-only">
        Submit
      </label>
      <button
        id="itemSearchSubmit"
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <Search className="w-5" />
      </button>
    </form>
  )
}

export default ItemSearch
