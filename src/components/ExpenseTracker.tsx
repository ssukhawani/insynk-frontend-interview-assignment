import React, { useEffect, useState } from 'react'
import Button from '../shared/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../utility/localStorage'
import { expenseDetails } from '../services/user'
import { type UserDetails } from '../interfaces/auth'

export default function ExpenseTracker() {
  const navigate = useNavigate()
  const location = useLocation()
  const [expenses, setExpenses] = useState(null)

  const normalStyle = {}
  const activeStyle = { opacity: 0.5, pointerEvents: 'none' }

  const styleToApply = location.pathname === '/expense-tracker' ? activeStyle : normalStyle

  useEffect(() => {
    async function fetchData() {
      const storedUser: UserDetails | null = getLocalStorageItem('user')
      if (storedUser != null) {
        try {
          const response = await expenseDetails(storedUser.id)
          setExpenses({ ...response.data })
        } catch (error) {
          console.error('Error fetching membership details:', error)
        }
      }
    }
    void fetchData()
  }, [])

  console.log(expenses, 'expenses')

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
          style={styleToApply}
        />
        <Button
          title={'Category'}
          onClick={() => {
            navigate('/categories')
          }}
        />
      </div>
    </div>
  )
}
