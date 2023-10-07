import React, { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Paper from '../shared/Paper'
import Navbar from '../shared/Navbar'
import { routes } from '../constants/routes'
import { getLocalStorageItem, setLocalStorageItem } from '../utility/localStorage'
import { type UserDetails } from '../interfaces/auth'

function Layout() {
  const location = useLocation()
  const [user, setUser] = useState<UserDetails | null>(null)
  console.log(location.pathname)
  useMemo(() => {
    setLocalStorageItem('currentRoute', location.pathname)

    const userDetails = getLocalStorageItem('user')
    if (userDetails != null) {
      setUser(userDetails as UserDetails)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Paper width={'700px'} height={'100%'}>
        <Navbar title={routes[location.pathname]} user={user} />

        <Outlet />
      </Paper>
    </div>
  )
}

export default Layout
