import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { Dashboard } from './Layouts/Dashboard.jsx'
import { Buyurtma } from './pages/Buyurtma.jsx'
import { Kategoriya } from './pages/Kategoriya.jsx'
import { Mahsulot } from './pages/Mahsulot.jsx'
import { ContextProvider } from './components/Context.jsx'
import { Login } from './pages/Auth/Login.jsx'
import Auth from './pages/Auth/Auth.jsx'
import { PublicRoute } from './components/Provider/PublicRoute.jsx'
import { PrivateRoute } from './components/Provider/PrivateRoute.jsx'
import { Menu } from './Layouts/Menu.jsx'
import { Menu_List } from './pages/Menu_List.jsx'


const rooter = createBrowserRouter([
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: "/menu/:chatId",
    element:
      <PublicRoute>
        <Menu />
      </PublicRoute>,
    children: [
      {
        index: true,
        element:
          <PublicRoute>
            <Menu_List />
          </PublicRoute>,
      }
    ]
  },
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/',
        element:
          <PrivateRoute>
            <App />
          </PrivateRoute>,
      },
      {
        path: 'buyurtma',
        element:
          <PrivateRoute>
            <Buyurtma />
          </PrivateRoute>,
      },
      {
        path: 'kategoriya',
        element:
          <PrivateRoute>
            <Kategoriya />
          </PrivateRoute>,
      },
      {
        path: 'mahsulot',
        element:
          <PrivateRoute>
            <Mahsulot />
          </PrivateRoute>,
      }
      // ]
      // }
    ]
  },
  {
    path: "*",
    element: <Navigate to='/' />
  }
])


createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={rooter} />
  </ContextProvider>
)
