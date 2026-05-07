import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './routers/Router.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/authContext/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
    <Toaster position="top-right" />
       </AuthProvider>
  
  </StrictMode>,
)
