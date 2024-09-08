import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'sonner';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RecoilRoot>
  <Toaster richColors position='bottom-center' />

    <App />
  </RecoilRoot>
  </StrictMode>,
)
