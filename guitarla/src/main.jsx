import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GuitarlaApp from './GuitarlaApp.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GuitarlaApp />
  </StrictMode>,
)
