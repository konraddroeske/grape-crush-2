import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'

import { useInView } from 'react-intersection-observer'

import { useDispatch, useSelector } from 'react-redux'

import Seo from '@components/common/Seo'
import Description from '@components/landing-page/description/Description'
import FeaturesSlideshow from '@components/landing-page/features/FeaturesSlideshow'
import Hero from '@components/landing-page/hero/Hero'
import InfoBox1 from '@components/landing-page/info-boxes/info-box-1/InfoBox1'
import ShopByTypeGrid from '@components/landing-page/shop-by-type/ShopByTypeGrid'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchIndexData from '@lib/fetchIndexData'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import {
  selectIndex,
  setBgGreen,
  setHouseWines,
  setInfoBoxes,
} from '@redux/indexSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Home: FunctionComponent = () => {
  const mainRef = useRef<HTMLElement>(null)
  const { bgGreen } = useSelector(selectIndex())
  const dispatch = useDispatch()

  const { ref, inView } = useInView({
    threshold: 0.25,
  })

  useEffect(() => {
    dispatch(setBgGreen(inView))
  }, [dispatch, inView])

  useEffect(() => {
    if (bgGreen) {
      gsap.to(mainRef.current, {
        backgroundColor: '#dfff85',
      })
    } else {
      gsap.to(mainRef.current, {
        backgroundColor: '#ffffff',
      })
    }
  }, [bgGreen])

  return (
    <>
      <Seo title="Wines Within Reach" />
      <main
        id="main"
        ref={mainRef}
        className="bg-white min-h-screen overflow-hidden"
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
  const {
    products,
    locale,
    heroSlideCollection,
    pageCollection,
    footerCollection,
    navCollection,
    categoryCollection,
  } = await fetchGlobalData()

  const { infoBox1Collection, houseWineCollection } = await fetchIndexData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageCollection))
  store.dispatch(setCategories(categoryCollection))
  store.dispatch(setFooter(footerCollection))
  store.dispatch(setNav(navCollection))
  store.dispatch(setHeroSlides(heroSlideCollection))

  // Index
  store.dispatch(setInfoBoxes(infoBox1Collection))
  store.dispatch(setHouseWines(houseWineCollection))

  return {
    props: {},
    revalidate: 60,
  }
})

export default Home
