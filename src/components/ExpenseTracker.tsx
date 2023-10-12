/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useMemo, useState, useEffect } from 'react'
import Button from '../shared/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../utility/localStorage'
import { expenseDetails } from '../services/user'
import { type UserDetails } from '../interfaces/auth'
import { type Expense } from '../interfaces/user'

export default function ExpenseTracker() {
  const navigate = useNavigate()
  const location = useLocation()
  const [expenses, setExpenses] = useState<Expense[] | null>(null)

  const normalStyle = {}
  const activeStyle = { opacity: 0.5, pointerEvents: 'none' }

  const styleToApply = location.pathname === '/expense-tracker' ? activeStyle : normalStyle

  useEffect(() => {
    async function fetchData() {
      const storedUser: UserDetails | null = getLocalStorageItem('user')
      if (storedUser != null) {
        try {
          const response = await expenseDetails(storedUser.id)
          setExpenses([...response.data])
        } catch (error) {
          console.error('Error fetching membership details:', error)
        }
      }
    }
    if (location.pathname === '/expense-tracker') {
      void fetchData()
    }
  }, [location.pathname])

  const groupedExpenses = useMemo(() => {
    const groupedData: Record<string, { net: number, expenses: Expense[] }> = {}
    const monthlyNet: Record<string, number> = {}

    if (expenses != null) {
      expenses.forEach((expense) => {
        const { date, type, amount } = expense
        const month = date.slice(0, 7)

        if (!monthlyNet[month]) {
          monthlyNet[month] = 0
        }

        if (!groupedData[month]) {
          groupedData[month] = { net: 0, expenses: [] }
        }

        const currentMonth = groupedData[month]
        currentMonth.net += type === 'IN' ? parseFloat(amount) : -parseFloat(amount)
        currentMonth.expenses.push(expense)

        monthlyNet[month] += type === 'IN' ? parseFloat(amount) : -parseFloat(amount)
      })
    }

    return { monthlyNet, groupedData }
  }, [expenses])

  return (
    <div
      style={{
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
        gap: '1rem'
      }}
    >
      <header>
        <div style={{ textAlign: 'center' }}>
          <h1>Expense Tracker</h1>
        </div>
      </header>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          overflow: 'auto',
          marginTop: '20px'
        }}
      >
        {Object.keys(groupedExpenses.monthlyNet).map((month) => (
          <div key={month} style={{ marginBottom: '2rem', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
              <h3 style={{ marginBottom: '10px', marginTop: '10px' }}>{month}</h3>
              <h3>{`${groupedExpenses.monthlyNet[month].toFixed(2)} ₹`}</h3>
            </div>
            <div style={{ maxHeight: '200px', overflow: 'auto', padding: '0 20px' }}>
              {groupedExpenses.groupedData[month].expenses.map((expense) => (
                <div
                  key={expense.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0.5rem',
                    background: '#f5f5f5',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc'
                  }}
                  onClick={() => {
                    navigate(`/update-expense/${expense.id}`, {
                      state: expense
                    })
                  }}
                >
                  <p>{expense.category_data.name}</p>
                  <p>{`${expense.type === 'IN' ? ' + ' : ' - '} ${expense.amount} ₹`}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5px',
          padding: '1rem'
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
      </footer>
    </div>
  )
}
