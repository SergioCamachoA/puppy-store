import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import axios from "axios"

import { BrowserRouter as Router } from "react-router-dom"
import { GlobalContextProvider } from "./hooks/useGlobal"

axios.defaults.baseURL = "http://localhost:8080/dogs"

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Router>
        <App />
      </Router>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
