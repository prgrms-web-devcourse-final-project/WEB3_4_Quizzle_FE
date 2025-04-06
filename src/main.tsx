import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./main.css"

// Create a root element if it doesn't exist
const rootElement = document.getElementById("root") || document.createElement("div")
if (!document.getElementById("root")) {
  rootElement.id = "root"
  document.body.appendChild(rootElement)
}

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

