import React, { FunctionComponent, useState } from 'react'

import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setNavSearch } from '@redux/clientSlice'

interface Props {
  variant: 'mobile' | 'desktop'
}

const NavSearch: FunctionComponent<Props> = ({ variant }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>('')
  const variants = {
    mobile: 'mt-6',
    desktop: 'my-0',
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(setNavSearch(search))
    setSearch('')
    router.push('/products', '/products', {
      shallow: true,
    })
  }

  return (
    <form
      className={`flex ${variants[variant]} w-full max-w-xl lg:max-w-none lg:mx-auto shadow-lime`}
      onSubmit={(event) => handleSearch(event)}
    >
      <label htmlFor="searchField" className="sr-only">
        Search
      </label>
      <input
        id="searchField"
        type="text"
        placeholder="Search"
        className="border border-lime flex-grow min-w-0 bg-transparent
            placeholder-gray-light text-white italic uppercase text-xs pl-4 pr-2 py-2
            border-r-transparent"
        value={search}
        onChange={handleChange}
      />
      <label htmlFor="searchSubmit" className="sr-only">
        Submit
      </label>
      <button
        id="searchSubmit"
        type="submit"
        className="relative form-divider flex justify-center items-center border
        border-lime text-white uppercase font-bold text-base py-2 px-4 lg:px-6 text-base
        border-l-transparent"
      >
        Search
      </button>
    </form>
  )
}

export default NavSearch
