import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


const savedSettings = JSON.parse(localStorage.getItem('settings'))
if (savedSettings?.darkMode) {
  document.body.classList.add('dark')
}
