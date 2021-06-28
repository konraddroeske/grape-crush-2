import React, { FunctionComponent, useState } from 'react'

import Link from 'next/link'

import RoundedButton from '@components/common/RoundedButton'

import Categories from '@components/landing-page/shop-by-type/Categories'
import SearchBar from '@components/nav-bar/SearchBar'

import MenuArrow from '../../assets/svgs/menu-arrow.svg'

interface MenuButtonProps {
  children: React.ReactNode
  handleOpen: () => void
  open: boolean
}

const MenuButton: FunctionComponent<MenuButtonProps> = ({
  children,
  handleOpen,
}) => {
  return (
    <button
      type="button"
      className="flex items-center text-4xl font-bold mb-6 uppercase"
      onClick={() => handleOpen()}
    >
      <div className="mr-2">{children}</div>
      <MenuArrow className="w-4" />
    </button>
  )
}

const MenuLink: FunctionComponent = ({ children }) => {
  return (
    <div className="text-4xl font-bold mb-6 uppercase">
      <Link href="/">{children}</Link>
    </div>
  )
}

const Menu: FunctionComponent = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className="flex flex-col py-8 nav-gutter-sm overflow-auto">
      <div className="mb-2">
        <MenuButton handleOpen={handleOpen} open={open}>
          Shop
        </MenuButton>
        {open && <Categories />}
        <MenuLink>About Us</MenuLink>
        <MenuLink>Visit Us</MenuLink>
        <MenuLink>FAQ</MenuLink>
      </div>
      <RoundedButton variant="full">Shop All Wines</RoundedButton>
      <SearchBar />
    </div>
  )
}

export default Menu
