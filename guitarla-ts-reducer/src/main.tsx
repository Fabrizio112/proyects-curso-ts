import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GuitarlaApp from './GuitarlaApp.js'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <>
    <GuitarlaApp />
  </>,
)
