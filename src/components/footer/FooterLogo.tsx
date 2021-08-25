import React, { FunctionComponent } from 'react'

import LogoStacked from '@assets/svgs/logo-stacked.svg'
import LogoTilted from '@assets/svgs/logo-tilted.svg'

const FooterLogo: FunctionComponent = () => {
  return (
    <div className="w-full overflow-hidden xl:w-6/12 xl:overflow-visible">
      <LogoTilted className="w-11/10 transform -translate-x-1/20 xl:hidden" />
      <LogoStacked className="hidden xl:block xl:transform xl:scale-110" />
    </div>
  )
}

export default FooterLogo
