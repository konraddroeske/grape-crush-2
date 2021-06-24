import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import RoundedButton from '@components/common/RoundedButton'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const InfoBox2: FunctionComponent = () => {
  const { infoBox2 } = useSelector(selectProducts())
  const { locale } = useSelector(selectGlobal())

  if (!infoBox2) return <></>

  const { title, description, image } = infoBox2
  return (
    <section className="py-12">
      <div className="body-gutter-s">
        <img
          src={image.file[locale].url}
          alt={image.description ? image.description[locale] : 'wine'}
        />
      </div>
      <div className="relative pt-6 bg-white">
        <div className="flex flex-col items-center body-gutter-s">
          <h3 className="text-lg font-bold center text-blue text-center capitalize leading-tight">
            {title[locale]}
          </h3>
          <p className="text-xs text-center py-2">{description[locale]}</p>
          <RoundedButton variant="sm">Explore</RoundedButton>
        </div>
      </div>
    </section>
  )
}

export default InfoBox2
