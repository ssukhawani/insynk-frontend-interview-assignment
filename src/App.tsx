import React from 'react'
import './App.css'
import {
  createBrowserRouter,
  type LoaderFunctionArgs,
  redirect,
  RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import PublicPage from './components/Publicpage'
import ExpenseTracker from './components/ExpenseTracker'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import { getLocalStorageItem } from './utility/localStorage'
import { setupInterceptors } from './interceptor/interceptors'
import instance from './interceptor/axiosInstance'

import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Categories from './components/Categories'
import AddUpdatedExpense from './components/AddUpdatedExpense'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: mainPageLoader,
        Component: PublicPage
      },
      {
        path: 'login',
        // action: loginAction,
        // loader: loginLoader,
        element: <LoginPage />
      },
      {
        path: 'signup',
        // action: loginAction,
        // loader: loginLoader,
        element: <SignupPage />
      },
      {
        path: 'expense-tracker',
        loader: protectedLoader,
        element: <ExpenseTracker />
      },
      {
        path: 'add-expense',
        loader: protectedLoader,
        element: <AddUpdatedExpense />
      },
      {
        path: 'update-expense/:id',
        loader: protectedLoader,
        element: <AddUpdatedExpense />
      },
      {
        path: 'categories',
        loader: protectedLoader,
        element: <Categories />
      }
    ]
  }
])

async function mainPageLoader() {
  const user: userInterface | null = getLocalStorageItem('user')

  if (user?.auth_token != null) {
    return redirect('/expense-tracker')
  }
  return null
}

interface userInterface {
  auth_token: string
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const user: userInterface | null = getLocalStorageItem('user')

  if (user?.auth_token == null) {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect('/login?' + params.toString())
  }
  return null
}

function App() {
  setupInterceptors(instance)
  return (
    <div className='App'>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      <ToastContainer
        position='bottom-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        style={{
          width: 'fit-content'
        }}
        limit={2}
      />
    </div>
  )
}

export default App
