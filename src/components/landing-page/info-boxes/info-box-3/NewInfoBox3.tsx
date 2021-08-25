import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ShadowButton from '@components/common/ShadowButton'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectGlobal } from '@redux/globalSlice'
import { selectIndex } from '@redux/indexSlice'

import StarOutline from '../../../../assets/svgs/star-outline.svg'

const NewInfoBox3: FunctionComponent = () => {
  const { infoBox3 } = useSelector(selectIndex())
  const { locale } = useSelector(selectGlobal())

  if (!infoBox3) return <></>

  const { title, description, image } = infoBox3

  return (
    <section
      className="relative sm:flex my-24 body-gutter-sm lg:body-gutter-lg
    xl:body-gutter-xl"
    >
      <div className="relative w-1/2">
        <div className="flex sm:min-h-96">
          <img
            className="object-cover w-full"
            src={image.file[locale].url}
            alt={image.description ? image.description[locale] : 'wine'}
          />
        </div>
      </div>
      <div className="relative z-10 flex items-center w-1/2">
        <div className="pl-24 md:pl-18 lg:pl-16 xl:pl-16">
          <InfoBoxTitle>{title[locale]}</InfoBoxTitle>
          <InfoBoxText>{description[locale]} </InfoBoxText>
          <ShadowButton text="Details" />
        </div>
      </div>
      <StarOutline
        className="absolute w-2/5 top-1/2 left-1/2 transform
      -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  )
}

export default NewInfoBox3
