import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import VertWave from '@assets/svgs/info-box-3-vert.svg'
import HoriWave from '@assets/svgs/info-box-3-wave.svg'
import Speedy from '@assets/svgs/speedy.svg'
import ContentfulImage from '@components/common/ContentfulImage'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import { selectIndex } from '@redux/indexSlice'

import InfoBoxTitle from '../InfoBoxTitle'

const InfoBox3: FunctionComponent = () => {
  const { infoBox3 } = useSelector(selectIndex())

  if (!infoBox3) return <></>

  const { title, description, image } = infoBox3
  return (
    <section className="sm:flex">
      <div className="relative pt-6 bg-gray-lightest sm:w-2/5 sm:pt-0 sm:flex sm:items-center">
        <div className="flex flex-col items-center body-gutter-sm sm:items-start lg:body-gutter-lg xl:body-gutter-xl">
          <InfoBoxTitle>{title}</InfoBoxTitle>
          <InfoBoxText>{description} </InfoBoxText>
        </div>
      </div>
      <div className="relative sm:w-3/5">
        <HoriWave className="absolute w-full top-0 left-0 sm:hidden" />
        <VertWave className="hidden sm:absolute sm:h-full sm:top-0 sm:left-0 bm:bottom-0 sm:block" />
        <Speedy
          className="absolute w-5/12 top-1/4 right-2 sm:top-0 sm:right-1/9
        sm:transform sm:-translate-y-1/2 sm:w-1/3"
        />
        <div className="flex sm:min-h-96">
          {image && <ContentfulImage image={image} />}
        </div>
      </div>
    </section>
  )
}

export default InfoBox3
