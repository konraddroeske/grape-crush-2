import React, { FunctionComponent, useEffect, useState } from 'react'

import { Place } from '@googlemaps/google-maps-services-js'
import { Loader } from '@googlemaps/js-api-loader'
import { useSelector } from 'react-redux'

import { selectContact } from '@redux/contactSlice'

const SimpleMap: FunctionComponent = () => {
  const { location } = useSelector(selectContact())
  const [defaultProps, setDefaultProps] = useState<Place | null>(null)

  const initMap = async (data: Place) => {
    const loader = new Loader({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: 'weekly',
    })

    const mapOptions = {
      center: data?.geometry?.location,
      zoom: 18,
      streetViewControl: false,
      mapTypeControl: false,
    }

    const google = await loader.load()
    const map = new google.maps.Map(document.getElementById('map'), mapOptions)

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      map,
      position: data?.geometry?.location,
      title: data.name,
    })
  }

  useEffect(() => {
    if (defaultProps) {
      initMap(defaultProps)
    }
  }, [defaultProps])

  useEffect(() => {
    if (location?.status === 'OK') {
      const place = location.result

      setDefaultProps(place)
    }
  }, [location])

  return (
    <div className="w-full h-96 shadow-blue-dark-lg 2xl:h-144">
      {defaultProps && <div id="map" className="w-full h-full" />}
    </div>
  )
}

export default SimpleMap
