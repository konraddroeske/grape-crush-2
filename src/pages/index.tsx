import React, { FunctionComponent, useEffect, useRef } from 'react'

import { useInView } from 'react-intersection-observer'

import { useDispatch, useSelector } from 'react-redux'

import Seo from '@components/common/Seo'
import Description from '@components/landing-page/description/Description'
import FeaturesSlideshow from '@components/landing-page/features/FeaturesSlideshow'
import Hero from '@components/landing-page/hero/Hero'
import InfoBox1 from '@components/landing-page/info-boxes/info-box-1/InfoBox1'
import ShopByTypeGrid from '@components/landing-page/shop-by-type/ShopByTypeGrid'
import useRouterScrollUpdate from '@hooks/useRouterScrollUpdate'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchIndexData from '@lib/fetchIndexData'

import {
  selectIndex,
  setBgLime,
  setHouseWines,
  setInfoBoxes,
} from '@redux/indexSlice'
import { wrapper } from '@redux/store'

const Home: FunctionComponent = () => {
  useRouterScrollUpdate()
  const mainRef = useRef<HTMLElement>(null)
  const { bgLime } = useSelector(selectIndex())
  const dispatch = useDispatch()

  const { ref, inView } = useInView({
    threshold: 0.25,
  })

  useEffect(() => {
    dispatch(setBgLime(inView))
  }, [dispatch, inView])

  return (
    <>
      <Seo title="Wines Within Reach" />
      <main
        id="main"
        ref={mainRef}
        className={`${
          bgLime ? 'bg-lime' : 'bg-white'
        } min-h-screen overflow-hidden transition duration-1000`}
      >
        <Hero />
        <Description />
        {/* <NewShopByType /> */}
        <div ref={ref}>
          <FeaturesSlideshow />
          <ShopByTypeGrid />
          {/* <ItemSlideshow /> */}
        </div>
        {/* <NewInfoBox3 /> */}
        <InfoBox1 />
      </main>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await fetchGlobalData(store)

  const { infoBox1Collection, houseWineCollection } = await fetchIndexData()

  // Index
  store.dispatch(setInfoBoxes(infoBox1Collection))
  store.dispatch(setHouseWines(houseWineCollection))

  return {
    props: {},
    revalidate: 60,
  }
})

export default Home
