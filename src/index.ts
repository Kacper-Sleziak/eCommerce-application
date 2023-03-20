import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'

import Home from './pages/Home'


const rootElement = document.getElementById('root')
// @ts-ignore
const root = createRoot(rootElement)
//const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
