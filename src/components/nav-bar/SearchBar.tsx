import React, { FunctionComponent } from 'react'

import Search from '../../assets/svgs/search.svg'

const SearchBar: FunctionComponent = () => {
  return (
    <div className="flex mt-6 w-full mx-auto">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-light flex-grow min-w-0 bg-transparent
            rounded-l-full placeholder-gray-dark text-xs pl-4 pr-2 py-2
            border-r-transparent"
      />
      <button
        type="submit"
        className="relative flex justify-center items-center flex-none border bg-blue
        border-gray-light rounded-r-full w-16 text-lime uppercase font-bold text-xs
        border-l-transparent sm:w-32"
      >
        <Search className="w-6" />
      </button>
    </div>
  )
}

export default SearchBar
