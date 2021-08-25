import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ShadowButton from '@components/common/ShadowButton'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectGlobal } from '@redux/globalSlice'
import { selectIndex } from '@redux/indexSlice'

const NewInfoBox1: FunctionComponent = () => {
  const { infoBox1 } = useSelector(selectIndex())
  const { locale } = useSelector(selectGlobal())

  if (!infoBox1) return <></>

  const { title, description, image } = infoBox1
  return (
    <section className="sm:flex my-24 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl">
      <div className="flex items-center w-1/2">
        <div className="pr-24 md:pr-18 lg:pr-16 xl:pr-16">
          <InfoBoxTitle>{title[locale]}</InfoBoxTitle>
          <InfoBoxText>{description[locale]}</InfoBoxText>
          <ShadowButton text="Shop" />
        </div>
      </div>
      <div className="w-1/2">
        <img
          className="w-full"
          src={image.file[locale].url}
          alt={image.description ? image.description[locale] : 'wine'}
        />
      </div>
    </section>
  )
}

export default NewInfoBox1
