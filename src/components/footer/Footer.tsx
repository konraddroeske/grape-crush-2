import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import FooterInfo from '@components/footer/FooterInfo'
import FooterSocial from '@components/footer/FooterSocial'
import { selectClient } from '@redux/clientSlice'

const Footer: FunctionComponent = () => {
  const { isLoading } = useSelector(selectClient())

  return (
    <footer className={isLoading ? 'opacity-0' : 'opacity-1'}>
      <FooterSocial />
      <FooterInfo />
    </footer>
  )
}

export default Footer
