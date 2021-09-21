import React, { FunctionComponent } from 'react'

import ShadowButton from '@components/common/ShadowButton'

const ContactForm: FunctionComponent = () => {
  return (
    <section
      id="contact-form"
      className="relative bg-lime py-12 xl:py-16 2xl:py-20"
    >
      <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
        <h2 className="uppercase text-blue-dark text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 lg:mb-6 xl:mb-8 2xl:mb-10">
          Or just say hello!
        </h2>
        <form
          className="grid grid-cols-1 gap-y-4 mx-auto max-w-2xl"
          onSubmit={() => null}
        >
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="uppercase border border-blue-dark"
            />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="uppercase border border-blue-dark"
            />
          </div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message"
            className="uppercase border border-blue-dark"
          />
          <div className="flex justify-center">
            <ShadowButton text="Send" variant="contact" fn={() => null} />
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
