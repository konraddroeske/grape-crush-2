import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
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
      <div className="min-h-screen pt-12">
        <div id="location" className="mt-4 overflow-hidden">
          <OutlineMarquee text="Visit us" />
        </div>
        <ContactInfo />
        <div id="contact" className="overflow-hidden">
          <OutlineMarquee text="Get in touch us" direction="-=" />
        </div>
        <ContactEmail />
        <ContactForm />
      </div>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const {
    products,
    locale,
    pageAssets,
    categoryAssets,
    footerAssets,
    navAssets,
    heroAssets,
  } = await fetchGlobalData()

  const { contactAssets, locationData } = await fetchContactData()

  // return location

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))
  store.dispatch(setHeroSlides(heroAssets))

  // Contact
  store.dispatch(setContact(contactAssets))
  store.dispatch(setLocation(locationData))

  return {
    props: {},
    revalidate: 60,
  }
})

export default Contact
