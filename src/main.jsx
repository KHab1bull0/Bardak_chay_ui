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
import { PublicRoute } from './components/Provider/PublicRoute.jsx'
import { PrivateRoute } from './components/Provider/PrivateRoute.jsx'
import { Menu } from './Layouts/Menu.jsx'
import { MainPage } from './pages/Menu/Main.jsx'
import { Branch } from './pages/Branch.jsx'
import { Reklama } from './pages/Reklama.jsx'


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
            <MainPage />
          </PublicRoute>,
      }
    ]
  },
  {
    path: '/',
    element:
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>,
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
      },
      {
        path: 'branch',
        element:
          <PrivateRoute>
            <Branch />
          </PrivateRoute>,
      },
      //reklama yuboruvchi 
      {
        path: 'reklama',
        element:
          <PrivateRoute>
            <Reklama/>
          </PrivateRoute>,
      }
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
