import React, { FunctionComponent, useEffect, useState } from 'react'

import { getCookie } from 'cookies-next'
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
  const [hasCookie, setHasCookie] = useState<boolean>(true)

  useEffect(() => {
    const cookie = !!getCookie('grapeCrushAgeConsent')
    setHasCookie(cookie)
  }, [])

  return (
    <>
      <NavBar />
      <div className="min-h-screen">{children}</div>
      {modalOpen && !hasCookie && <HeroModal />}
      <Footer />
    </>
  )
}

export default Layout
