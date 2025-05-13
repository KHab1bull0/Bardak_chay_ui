import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { DashboardLayout } from './Layouts/DashboardLayout.jsx'


const rooter = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      }
    ]
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rooter} />
  </StrictMode>,
)
