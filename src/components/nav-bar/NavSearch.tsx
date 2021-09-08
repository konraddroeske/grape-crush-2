import React, { FunctionComponent } from 'react'

interface Props {
  variant: 'mobile' | 'desktop'
}

const NavSearch: FunctionComponent<Props> = ({ variant }) => {
  const variants = {
    mobile: 'mt-6',
    desktop: 'my-0',
  }

  return (
    <div
      className={`flex ${variants[variant]} w-full max-w-md lg:max-w-none lg:mx-auto shadow-lime`}
    >
      <input
        type="text"
        placeholder="Search"
        className="border border-lime flex-grow min-w-0 bg-transparent
            placeholder-gray-light text-white italic uppercase text-xs pl-4 pr-2 py-2
            border-r-transparent"
      />
      <button
        type="submit"
        className="relative form-divider flex justify-center items-center border
        border-lime text-white uppercase font-bold text-base py-2 px-4 lg:px-6 text-base
        border-l-transparent"
      >
        Search
      </button>
    </div>
  )
}

export default NavSearch
