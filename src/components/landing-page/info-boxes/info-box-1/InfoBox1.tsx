import React, { FunctionComponent } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import ShadowLink from '@components/common/ShadowLink'
import SvgPopUp from '@components/landing-page/info-boxes/info-box-1/SvgPopUp'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectIndex } from '@redux/indexSlice'

const InfoBox1: FunctionComponent = () => {
  const { infoBox1, houseWines } = useSelector(selectIndex())

  if (!infoBox1) return <></>

  const { title, description } = infoBox1
  return (
    <section
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16 section-margin
    body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl max-w-screen-2xl mx-auto"
    >
      <div className="flex sm:items-center w-full sm:col-start-2">
        <div className="sm:pr-16 xl:pr-20">
          <InfoBoxTitle>{title}</InfoBoxTitle>
          <InfoBoxText>{description}</InfoBoxText>
          <div className="flex justify-center sm:mt-0 sm:justify-start">
            <Link href="/products">
              <a>
                <ShadowLink>Explore</ShadowLink>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row-start-1 sm:col-start-1 w-full sm:flex sm:max-h-70vh">
        <SvgPopUp images={houseWines} title={title} description={description} />
      </div>
    </section>
  )
}

export default InfoBox1
