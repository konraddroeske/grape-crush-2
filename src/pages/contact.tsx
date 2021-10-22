import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import ContactEmail from '@components/contact-page/ContactEmail'
import ContactForm from '@components/contact-page/ContactForm'
import ContactInfo from '@components/contact-page/ContactInfo'
import useRouterScrollUpdate from '@hooks/useRouterScrollUpdate'
import fetchContactData from '@lib/fetchContactData'
import fetchGlobalData from '@lib/fetchGlobalData'
import { selectContact, setContact, setLocation } from '@redux/contactSlice'

import { wrapper } from '@redux/store'

const Contact: FunctionComponent = () => {
  useRouterScrollUpdate()
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
          <OutlineMarquee text="Get in touch" direction="-=" />
        </div>
        <ContactEmail />
        <ContactForm />
      </div>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await fetchGlobalData(store)

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
