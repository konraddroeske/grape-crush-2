import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'

import { setNavSearch } from '@redux/clientSlice'

import { selectGlobal } from '@redux/globalSlice'

import SearchIcon from '../../assets/svgs/search.svg'

const DesktopSearch: FunctionComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { navOpen } = useSelector(selectGlobal())
  const [expanded, setExpanded] = useState<boolean>(false)
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

  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (navOpen && expanded) {
      gsap.set(formRef.current, {
        backgroundColor: '#dfff85',
      })
    } else if (navOpen && !expanded) {
      gsap.set(formRef.current, {
        backgroundColor: '#dfff85',
      })
    } else if (!navOpen && expanded) {
      gsap.set(formRef.current, {
        backgroundColor: '#f4f3f9',
      })
    } else {
      gsap.set(formRef.current, {
        backgroundColor: 'transparent',
      })
    }
  }, [navOpen, expanded])

  return (
    <div className="hidden lg:block mr-4 xl:mr-6">
      <form
        ref={formRef}
        className="justify-center items-center h-8 rounded-full transition-all duration-300"
        style={{
          backgroundColor: expanded ? '#f4f3f9' : 'transparent',
          display: router.route === '/products' ? 'none' : 'flex',
        }}
        onSubmit={(event) => handleSearch(event)}
      >
        <label htmlFor="searchField" className="sr-only">
          Search
        </label>
        <input
          ref={inputRef}
          id="searchField"
          type="text"
          placeholder="Search"
          className={`h-8 bg-transparent border-0 w-0 px-0 font-bold ${
            navOpen ? 'placeholder-blue-dark' : 'placeholder-blue-light'
          }
          text-blue-dark uppercase italic transition-all duration-300`}
          value={search}
          onChange={handleChange}
          onBlur={() => setExpanded(false)}
          style={{
            width: expanded ? '10rem' : 0,
            paddingLeft: expanded ? '1rem' : 0,
          }}
        />
        <button
          ref={buttonRef}
          type="button"
          className="w-8 flex justify-center items-center"
          onClick={(e) => {
            if (!expanded) setExpanded(true)
            else handleSearch(e)
          }}
        >
          <SearchIcon className="w-6" />
        </button>
      </form>
    </div>
  )
}

export default DesktopSearch
