import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
import RouterScroll from '@components/common/RouterScroll'
import Seo from '@components/common/Seo'
import ContactEmail from '@components/contact-page/ContactEmail'
import ContactForm from '@components/contact-page/ContactForm'
import ContactInfo from '@components/contact-page/ContactInfo'
import fetchContactData from '@lib/fetchContactData'
import fetchGlobalData from '@lib/fetchGlobalData'
import { selectContact, setContact, setLocation } from '@redux/contactSlice'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Contact: FunctionComponent = () => {
  const { fields } = useSelector(selectContact())

  if (!fields)
    return (
      <div>
        <h1>Not loaded.</h1>
      </div>
    )

  return (
    <>
      <Seo title="Contact" />
      <RouterScroll>
        <div className="min-h-screen pt-12">
          <div id="location" className="mt-4 overflow-hidden">
            <OutlineMarquee text="Visit us" />
          </div>
          <ContactInfo />
          <div id="contact" className="overflow-hidden">
            <OutlineMarquee text="Get in touch" direction="-=" />
          </div>
          <ContactEmail />
          <ContactForm />
        </div>
      </RouterScroll>{' '}
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

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageCollection))
  store.dispatch(setCategories(categoryCollection))
  store.dispatch(setFooter(footerCollection))
  store.dispatch(setNav(navCollection))
  store.dispatch(setHeroSlides(heroSlideCollection))

  const { contactCollection, locationData } = await fetchContactData()

  // Contact
  store.dispatch(setContact(contactCollection))
  store.dispatch(setLocation(locationData))

  return {
    props: {},
    revalidate: 60,
  }
})

export default Contact
