import React, { FunctionComponent } from 'react'

const Mailer: FunctionComponent = () => {
  return (
    <div className="bg-purple body-gutter-sm py-8 sm:pb-4">
      <h3 className="text-3xl font-bold center text-lime text-center uppercase">
        Let's stay in touch
      </h3>
      <form action="">
        <div className="flex mt-6 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="border border-white flex-grow min-w-0 bg-transparent
            rounded-l-full uppercase placeholder-white text-xs pl-4 pr-2 py-3
            border-r-transparent"
          />
          <button
            type="submit"
            className="relative flex-none border border-white rounded-r-full w-20
            text-lime uppercase font-bold text-xs border-l-transparent form-divider
            sm:w-32"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Mailer
