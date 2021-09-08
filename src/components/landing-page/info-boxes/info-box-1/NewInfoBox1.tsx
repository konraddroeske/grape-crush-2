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
    <section className="flex flex-col-reverse sm:flex-row sm:flex my-24 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl">
      <div className="flex items-center w-full sm:w-1/2 pt-4 sm:pt-0">
        <div className="sm:pr-16 xl:pr-20">
          <InfoBoxTitle>{title[locale]}</InfoBoxTitle>
          <InfoBoxText>{description[locale]}</InfoBoxText>
          <div className="flex justify-center sm:mt-0 sm:justify-start">
            <ShadowButton text="Shop" />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 sm:flex sm:max-h-70vh">
        <img
          className="w-full object-contain"
          src={image?.file[locale].url}
          alt={image?.description ? image.description[locale] : 'wine'}
        />
      </div>
    </section>
  )
}

export default NewInfoBox1
