import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react'

import axios from 'axios'

import ShadowButton from '@components/common/buttons/ShadowButton'

interface ContactStatus {
  submitted: boolean
  submitting: boolean
  info: {
    error: boolean
    msg: string | null
  }
}

const ContactForm: FunctionComponent = () => {
  const [status, setStatus] = useState<ContactStatus>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg },
      })
      setInputs({
        name: '',
        email: '',
        message: '',
      })
    } else {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: true, msg },
      })
    }
  }

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist()
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    })
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }))
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/xrgrjnjw',
      data: inputs,
    })
      .then(() => {
        handleServerResponse(
          true,
          'Thank you, your message has been submitted.'
        )
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error)
      })
  }

  // eslint-disable-next-line no-nested-ternary
  const buttonText = !status.submitting
    ? !status.submitted
      ? 'Submit'
      : 'Submitted'
    : 'Submitting...'

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
          onSubmit={handleOnSubmit}
        >
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleOnChange}
              required
              className="uppercase border border-blue-dark"
            />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="_replyto"
              placeholder="Email"
              value={inputs.email}
              onChange={handleOnChange}
              required
              className="uppercase border border-blue-dark"
            />
          </div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message"
            name="message"
            value={inputs.message}
            onChange={handleOnChange}
            required
            className="uppercase border border-blue-dark"
          />
          <div className="flex justify-center">
            <ShadowButton
              variant="contact"
              type="submit"
              fn={() => null}
              disabled={status.submitting}
            >
              {buttonText}
            </ShadowButton>
          </div>
        </form>
        {status.info.error && (
          <div className="text-red text-center mt-6">
            Error: {status.info.msg}
          </div>
        )}
        {!status.info.error && status.info.msg && (
          <p className="text-center mt-6">{status.info.msg}</p>
        )}
      </div>
    </section>
  )
}

export default ContactForm
