import React, { FunctionComponent } from 'react'

import FooterInfo from '@components/footer/FooterInfo'
import FooterNav from '@components/footer/FooterNav'
import FooterSocial from '@components/footer/FooterSocial'

const Footer: FunctionComponent = () => {
  return (
    <footer className="">
      <FooterSocial />
      <FooterNav />
      <FooterInfo />
    </footer>
  )
}

export default Footer
