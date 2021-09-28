import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import Footer from '@components/footer/Footer'
import HeroModal from '@components/landing-page/hero/HeroModal'
import NavBar from '@components/nav-bar/NavBar'
import { selectClient } from '@redux/clientSlice'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const Layout: FunctionComponent<Props> = ({ children }) => {
  const { modalOpen } = useSelector(selectClient())
  return (
    <>
      <NavBar />
      {children}
      {modalOpen && <HeroModal />}
      <Footer />
    </>
  )
}

export default Layout
