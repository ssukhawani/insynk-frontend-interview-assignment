import React, { useEffect, useState } from 'react'
import Button from '../shared/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../utility/localStorage'
import { type UserDetails } from '../interfaces/auth'
import { categoryList } from '../services/user'

export default function Categories() {
  const navigate = useNavigate()
  const location = useLocation()
  const [categories, setCategories] = useState(null)

  const normalStyle = {}
  const activeStyle = { opacity: 0.5, pointerEvents: 'none' }

  const styleToApply = location.pathname === '/categories' ? activeStyle : normalStyle

  useEffect(() => {
    // this is created to fetch categories created by users
    async function fetchData() {
      const storedUser: UserDetails | null = getLocalStorageItem('user')
      if (storedUser != null) {
        try {
          const response = await categoryList(storedUser.id)
          setCategories({ ...response.data })
        } catch (error) {
          console.error('Error fetching membership details:', error)
        }
      }
    }
    void fetchData()
  }, [])

  console.log(categories, 'categories')

  return (
    <div
      style={{
        display: 'grid',
        height: '97%'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '5px',
          marginLeft: '5px',
          marginRight: '5px',
          marginTop: 'auto'
        }}
      >
        <Button
          title={'Expense Tracking'}
          onClick={() => {
            navigate('/expense-tracker')
          }}
        />
        <Button
          title={'Category'}
          onClick={() => {
            navigate('/categories')
          }}
          style={styleToApply}
        />
      </div>
    </div>
  )
}
