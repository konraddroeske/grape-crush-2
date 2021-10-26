import React, {
  BaseSyntheticEvent,
  FunctionComponent,
  useCallback,
  useState,
} from 'react'

import debounce from 'lodash.debounce'

import Search from '@assets/svgs/search.svg'

interface OwnProps {
  handleSearch: (searchTerm: string) => void
}

type Props = OwnProps

const CategorySearch: FunctionComponent<Props> = ({ handleSearch }) => {
  const [value, setValue] = useState<string>('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((nextValue) => handleSearch(nextValue), 300),
    []
  )

  const handleChange = (event: BaseSyntheticEvent) => {
    const { value: nextValue } = event.target
    setValue(nextValue)

    debouncedSearch(nextValue)
  }

  return (
    <div className="relative border-b border-blue-form">
      <Search className="opacity-50 absolute left-0 top-1/2 transform -translate-y-1/2 w-6" />
      <input
        type="text"
        placeholder="Search"
        className="w-full border border-transparent bg-transparent font-medium
        placeholder-blue-dark placeholder-opacity-50 uppercase text-blue-dark py-0 pl-7"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default CategorySearch
