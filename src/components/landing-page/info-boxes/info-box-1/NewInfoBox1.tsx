import React, { FunctionComponent } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import ShadowLink from '@components/common/ShadowLink'
import InfoBoxText from '@components/landing-page/info-boxes/InfoBoxText'
import InfoBoxTitle from '@components/landing-page/info-boxes/InfoBoxTitle'
import { selectIndex } from '@redux/indexSlice'

const NewInfoBox1: FunctionComponent = () => {
  const { infoBox1 } = useSelector(selectIndex())

  if (!infoBox1) return <></>

  const { title, description, image } = infoBox1
  return (
    <section
      className="flex flex-col-reverse sm:flex-row sm:flex section-margin
    body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl"
    >
      <div className="flex items-center w-full sm:w-1/2 pt-4 sm:pt-0">
        <div className="sm:pr-16 xl:pr-20">
          <InfoBoxTitle>{title}</InfoBoxTitle>
          <InfoBoxText>{description}</InfoBoxText>
          <div className="flex justify-center sm:mt-0 sm:justify-start">
            <Link href="/products">
              <a>
                <ShadowLink>Shop</ShadowLink>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 sm:flex sm:max-h-70vh">
        {image && <ContentfulImage image={image} objectFit="object-contain" />}
      </div>
    </section>
  )
}

export default NewInfoBox1
