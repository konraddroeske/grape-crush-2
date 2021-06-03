import React, { FC } from "react"

import { AppProps } from "next/app"

import "../styles/tailwind.scss"
import { wrapper } from "@redux/store"

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default wrapper.withRedux(App)
