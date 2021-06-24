import React, { FunctionComponent } from 'react'

import Footer from '@components/footer/Footer'
import NavBar from '@components/nav-bar/NavBar'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
