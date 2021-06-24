import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import Wave from '@assets/svgs/info-box-1-hori.svg'
import RoundedButton from '@components/common/RoundedButton'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const InfoBox1: FunctionComponent = () => {
  const { infoBox1 } = useSelector(selectProducts())
  const { locale } = useSelector(selectGlobal())

  if (!infoBox1) return <></>

  const { title, description, image } = infoBox1
  return (
    <section>
      <div className="relative pt-6 bg-purple-light">
        <div className="flex flex-col items-center body-gutter-s">
          <h3 className="text-lg font-bold center text-blue text-center capitalize leading-tight">
            {title[locale]}
          </h3>
          <p className="text-xs text-center py-2">{description[locale]}</p>
          <RoundedButton variant="sm">Explore</RoundedButton>
        </div>
      </div>
      <div className="relative">
        <Wave className="absolute w-full top-0 left-0" />
        <img
          src={image.file[locale].url}
          alt={image.description ? image.description[locale] : 'wine'}
        />
      </div>
    </section>
  )
}

export default InfoBox1
