import React, { FunctionComponent } from 'react'

const Mailer: FunctionComponent = () => {
  return (
    <div
      className="flex flex-col justify-center w-full body-gutter-sm border
    border-t border-b border-blue-dark"
    >
      <h3 className="font-bold center text-blue-dark text-center text-3xl lg:text-4xl">
        Let's be friends
      </h3>
      <form action="">
        <div className="flex justify-center mt-6 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="flex-grow border border-0 border-b border-blue-dark uppercase
            placeholder-blue-dark max-w-md p-0 mr-4"
          />
          <button
            type="submit"
            className="text-md text-blue-dark font-bold uppercase bg-lime py-2 px-6
      shadow-blue-dark border border-blue-dark"
          >
            Ok
          </button>
        </div>
      </form>
    </div>
  )
}

export default Mailer
