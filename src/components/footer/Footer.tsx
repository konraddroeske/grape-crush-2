import React, { FunctionComponent } from 'react'

import FooterInfo from '@components/footer/FooterInfo'
import FooterSocial from '@components/footer/FooterSocial'

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <FooterSocial />
      <FooterInfo />
    </footer>
  )
}

export default Footer
