import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContadorProvider } from './context/ContadorContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContadorProvider>
      <App />
    </ContadorProvider>
  </StrictMode>,
)
