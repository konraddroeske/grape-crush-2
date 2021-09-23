import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import ShadowButton from '@components/common/ShadowButton'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectGlobal } from '@redux/globalSlice'
import { selectIndex } from '@redux/indexSlice'

import StarOutline from '../../../../assets/svgs/star-outline.svg'

const NewInfoBox3: FunctionComponent = () => {
  const router = useRouter()
  const { infoBox3 } = useSelector(selectIndex())
  const { locale } = useSelector(selectGlobal())

  if (!infoBox3) return <></>

  const { title, description, image } = infoBox3

  return (
    <section
      className="relative sm:flex section-margin body-gutter-sm lg:body-gutter-lg
    xl:body-gutter-xl"
    >
      <div className="relative w-full sm:flex sm:max-h-70vh lg:w-1/2">
        {image && <ContentfulImage image={image} />}{' '}
      </div>
      <div className="relative z-10 flex items-center w-full lg:w-1/2">
        <div className="relative z-10 pt-4 sm:pt-0 sm:pl-16 xl:pl-20">
          <InfoBoxTitle>{title[locale]}</InfoBoxTitle>
          <InfoBoxText>{description[locale]} </InfoBoxText>
          <div className="flex justify-center sm:mt-0 sm:justify-start">
            <ShadowButton
              text="Details"
              fn={() =>
                router
                  .push('/faq#same-day', '/faq#same-day', {
                    shallow: false,
                  })
                  .then(() => window.scrollTo(0, 0))
              }
            />
          </div>
        </div>
        <StarOutline
          className="absolute top-0 left-1/2 w-full max-w-xs max-h-4/5 sm:max-w-none
          sm:top-1/2 sm:left-auto transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  )
}

export default NewInfoBox3
