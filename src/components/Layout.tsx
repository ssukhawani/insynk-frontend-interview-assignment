import React, { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Paper from '../shared/Paper'
import Navbar from '../shared/Navbar'
import { routes } from '../constants/routes'
import { getLocalStorageItem, setLocalStorageItem } from '../utility/localStorage'
import { type UserDetails } from '../interfaces/auth'
import Button from '../shared/Button'

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserDetails | null>(null)

  useMemo(() => {
    setLocalStorageItem('currentRoute', location.pathname)

    const userDetails = getLocalStorageItem('user')
    if (userDetails != null) {
      setUser(userDetails as UserDetails)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Extract the "id" from the route using a regular expression
  const match = location.pathname.match(/^\/update-expense\/(\d+)$/)

  // Determine the title based on the route
  let title = routes[location.pathname]
  if (match != null) {
    const id = match[1] // Extract the "id" from the match
    title = `Update Expense - ${id}` // Set custom title for update-expense route
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Paper width={'700px'} height={'100%'}>
        <Navbar
          title={title}
          user={user}
          button={
            location.pathname === '/expense-tracker' && (
              <Button
                onClick={() => {
                  navigate('/add-expense')
                }}
                title={'Add'}
                style={{
                  flex: '0.2',
                  height: '34px',
                  borderRadius: '5px',
                  marginLeft: '10px',
                  background: 'white',
                  color: 'black'
                }}
              />
            )
          }
        />

        <Outlet />
      </Paper>
    </div>
  )
}

export default Layout
