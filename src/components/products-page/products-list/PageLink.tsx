import React, { FunctionComponent } from 'react'

interface OwnProps {
  pageNumber: number
  currentPage: number
  handleClick: (newPage: number) => void
}

type Props = OwnProps

const PageLink: FunctionComponent<Props> = ({
  pageNumber,
  currentPage,
  handleClick,
}) => {
  return (
    <div
      className={`${
        pageNumber === currentPage
          ? 'bg-lime border border-blue-dark'
          : 'bg-white border border-transparent'
      } hover:bg-lime`}
    >
      <button
        type="button"
        className="w-9 h-9 text-lg text-blue-dark font-bold"
        onClick={() => handleClick(pageNumber)}
      >
        {pageNumber}
      </button>
    </div>
  )
}

export default PageLink
