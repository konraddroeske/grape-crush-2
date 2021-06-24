import React, { FunctionComponent } from 'react'

const Mailer: FunctionComponent = () => {
  return (
    <div className="bg-purple body-gutter-s py-8">
      <h3 className="text-3xl font-bold center text-lime text-center uppercase">
        Let's stay in touch
      </h3>
      <form action="">
        <div className="flex my-6">
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
            text-lime uppercase font-bold text-xs border-l-transparent form-divider"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Mailer
