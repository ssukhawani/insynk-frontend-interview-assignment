import React, { type FormEvent, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../services/auth'
import Button from '../shared/Button'
import { setLocalStorageItem } from '../utility/localStorage'

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
      .then((response) => {
        setLocalStorageItem('user', response.data)
        navigate({
          pathname: '/expense-tracker'
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
      </form>
    </div>
  )
}
