/* eslint-disable @typescript-eslint/no-misused-promises */
/* SignupPage.tsx */
import React, { type FormEvent, useState } from 'react'
import { signUp } from '../services/auth'
import '../css/Signup.css'
import Button from '../shared/Button'
import { useNavigate } from 'react-router-dom'

interface AuthData {
  email: string
  password: string
  first_name: string
  last_name: string
}

export default function SignupPage () {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  })

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault()

    signUp(formData)
      .then((response) => {
        navigate({
          pathname: '/login',
          search: `?email=${window.btoa(response.data.email)}`
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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { email, password, first_name, last_name } = formData

  return (
    <div className='signup-container'>
      <form onSubmit={handleSignUp}>
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
        <input
          type='text'
          name='first_name'
          placeholder='First Name'
          value={first_name}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          value={last_name}
          onChange={handleChange}
          required
        />
        <Button type='submit' title={'Sign Up'} className='button' />
      </form>
    </div>
  )
}
