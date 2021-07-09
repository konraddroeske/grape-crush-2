import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import HoriWave from '@assets/svgs/info-box-1-hori.svg'
import VertWave from '@assets/svgs/info-box-1-vert.svg'
import Sticker from '@assets/svgs/local-sticker.svg'
import RoundedButton from '@components/common/RoundedButton'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectGlobal } from '@redux/globalSlice'
import { selectIndex } from '@redux/indexSlice'

const InfoBox1: FunctionComponent = () => {
  const { infoBox1 } = useSelector(selectIndex())
  const { locale } = useSelector(selectGlobal())

  if (!infoBox1) return <></>

  const { title, description, image } = infoBox1
  return (
    <section className="sm:flex">
      <div className="relative pt-6 bg-purple-light sm:w-2/5 sm:pt-0 sm:flex sm:items-center">
        <div className="flex flex-col items-center body-gutter-sm sm:items-start lg:body-gutter-lg xl:body-gutter-xl">
          <InfoBoxTitle>{title[locale]}</InfoBoxTitle>
          <InfoBoxText>{description[locale]}</InfoBoxText>
          <RoundedButton variant="sm" marginX="mx-0">
            Explore
          </RoundedButton>
        </div>
      </div>
      <div className="relative sm:w-3/5">
        <HoriWave className="absolute w-full top-0 left-0 sm:hidden" />
        <VertWave className="hidden sm:block sm:absolute sm:top-0 sm:left-0 sm:bottom-0 sm:h-full" />
        <div className="flex sm:min-h-96">
          <img
            className="object-cover w-full"
            src={image.file[locale].url}
            alt={image.description ? image.description[locale] : 'wine'}
          />
          <Sticker className="absolute top-1/10 right-1/20 w-1/3 sm:top-1/20" />
        </div>
      </div>
    </section>
  )
}

export default InfoBox1
