import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Paper from '../shared/Paper'
import Navbar from '../shared/Navbar'
import { routes } from '../constants/routes'

export default function Layout () {
  const location = useLocation()
  console.log(location)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Paper width={'600px'} height={'100%'}>
        <Navbar title={routes[location.pathname]} />

        <Outlet />
      </Paper>
    </div>
  )
}
