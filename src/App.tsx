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
// import { fakeAuthProvider } from './interfaces/auth'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import { getLocalStorageItem } from './utility/localStorage'
import { setupInterceptors } from './interceptor/interceptors'
import instance from './interceptor/axiosInstance'

import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Categories from './components/Categories'

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
        Component: ExpenseTracker
      },
      {
        path: 'categories',
        loader: protectedLoader,
        Component: Categories
      }
    ]
  }
])

// async function loginAction ({ request }: LoaderFunctionArgs) {
//   const formData = await request.formData()
//   const username = formData.get('username') as string | null

//   // Validate our form inputs and return validation errors via useActionData()
//   if (username == null) {
//     return {
//       error: 'You must provide a username to log in'
//     }
//   }

//   // Sign in and redirect to the proper destination if successful.
//   try {
//     await fakeAuthProvider.signin(username)
//   } catch (error) {
//     // Unused as of now but this is how you would handle invalid
//     // username/password combinations - just like validating the inputs
//     // above
//     return {
//       error: 'Invalid login attempt'
//     }
//   }

//   const redirectTo = formData.get('redirectTo') as string | null
//   return redirect(redirectTo ?? '/')
// }

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
        autoClose={4000}
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
        limit={3}
      />
    </div>
  )
}

export default App
