import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import Wave from '@assets/svgs/info-box-3-wave.svg'
import Speedy from '@assets/svgs/speedy.svg'
import { selectGlobal } from '@redux/globalSlice'
import { selectProducts } from '@redux/productsSlice'

const InfoBox3: FunctionComponent = () => {
  const { infoBox3 } = useSelector(selectProducts())
  const { locale } = useSelector(selectGlobal())

  if (!infoBox3) return <></>

  const { title, description, image } = infoBox3
  return (
    <section>
      <div className="relative pt-6 bg-gray-light">
        <div className="flex flex-col items-center body-gutter-s">
          <h3 className="text-lg font-bold center text-blue text-center capitalize leading-tight">
            {title[locale]}
          </h3>
          <p className="text-xs text-center py-2">{description[locale]}</p>
        </div>
      </div>
      <div className="relative">
        <Wave className="absolute w-full top-0 left-0" />
        <Speedy className="absolute w-5/12 top-1/4 right-2" />
        <img
          src={image.file[locale].url}
          alt={image.description ? image.description[locale] : 'wine'}
        />
      </div>
    </section>
  )
}

export default InfoBox3
