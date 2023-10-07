import React, { type FormEvent, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../services/auth'
import Button from '../shared/Button'
import { setLocalStorageItem, updateLocalStorageItem } from '../utility/localStorage'
import CustomLink from '../shared/Link'
import { loggedInUserDetails } from '../services/user'
import { toast } from 'react-toastify'
import { toastMsg } from '../constants/toast-messages'

interface AuthData {
  email: string
  password: string
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: ''
  })

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()

    login(formData)
      .then((tokenDetails) => {
        setLocalStorageItem('user', { ...tokenDetails.data })
        void loggedInUserDetails().then((userDetails) => {
          updateLocalStorageItem('user', { ...userDetails.data })
          toast.success(toastMsg.LOGIN_SUCCESS, {
            toastId: 'login'
          })
          navigate({
            pathname: '/expense-tracker'
          })
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const { email, password } = formData

  useEffect(() => {
    const emailFromQuery = searchParams.get('email')

    if (emailFromQuery != null) {
      setFormData({ ...formData, email: window.atob(emailFromQuery) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='signup-container'>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleChange}
          required
        />
        <Button type='submit' title={'Login'} className='button' />
        <CustomLink to={'/signup'} prefixText={'Don\'t have an account?'} linkText='Sign up here' />
      </form>
    </div>
  )
}
