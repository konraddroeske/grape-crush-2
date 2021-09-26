import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import RoundedButton from '@components/common/RoundedButton'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectIndex } from '@redux/indexSlice'

const InfoBox2: FunctionComponent = () => {
  const { infoBox2 } = useSelector(selectIndex())

  if (!infoBox2) return <></>

  const { title, description, image } = infoBox2
  return (
    <section
      className="py-12 sm:flex sm:min-h-96 sm:body-gutter-sm lg:body-gutter-lg
    xl:body-gutter-xl"
    >
      <div className="body-gutter-sm sm:px-0 sm:w-3/5">
        {image && <ContentfulImage image={image} />}
      </div>
      <div className="relative pt-6 bg-white sm:pt-0 sm:flex sm:w-2/5 sm:items-center">
        <div
          className="flex flex-col items-center body-gutter-sm sm:items-start
        lg:body-gutter-lg"
        >
          <InfoBoxTitle>{title}</InfoBoxTitle>
          <InfoBoxText>{description}</InfoBoxText>
          <RoundedButton variant="sm" marginX="mx-0">
            Explore
          </RoundedButton>
        </div>
      </div>
    </section>
  )
}

export default InfoBox2
