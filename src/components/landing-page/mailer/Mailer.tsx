import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react'

import axios from 'axios'

import ShadowButton from '@components/common/ShadowButton'

interface MailerStatus {
  submitted: boolean
  submitting: boolean
  info: {
    error: boolean
    msg: string | null
  }
}

const Mailer: FunctionComponent = () => {
  const [status, setStatus] = useState<MailerStatus>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })

  const [inputs, setInputs] = useState({
    email: '',
  })

  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg },
      })
      setInputs({
        email: '',
      })
    } else {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: true, msg },
      })
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      url: 'https://formspree.io/f/xqkwnrnp',
      data: inputs,
    })
      .then(() => {
        handleServerResponse(true, 'Thank you, your e-mail has been submitted.')
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error)
      })
  }

  return (
    <div
      className="flex flex-col justify-center w-full body-gutter-sm
    border-t border-b border-blue-dark lg:border-0"
    >
      <h3 className="my-6 font-bold center text-blue-dark text-center text-4xl sm:text-5xl xl:text-7xl 2xl:text-8xl">
        <span>Let's be</span>
        <span className="block">friends</span>
      </h3>
      <form onSubmit={handleOnSubmit}>
        <div className="flex justify-center max-w-2xl mx-auto">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            name="_replyto"
            onChange={handleOnChange}
            value={inputs.email}
            required
            className="flex-grow border border-0 border-b border-blue-dark uppercase
            placeholder-blue-dark max-w-md p-0 mr-4 min-w-0"
          />
          <ShadowButton
            type="submit"
            disabled={status.submitting}
            fn={() => null}
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {!status.submitting
              ? !status.submitted
                ? 'Send'
                : 'Sent'
              : 'Sending...'}
          </ShadowButton>
        </div>
      </form>
      {status.info.error && (
        <div className="text-red my-4">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && (
        <p className="text-center my-6">{status.info.msg}</p>
      )}
    </div>
  )
}

export default Mailer
