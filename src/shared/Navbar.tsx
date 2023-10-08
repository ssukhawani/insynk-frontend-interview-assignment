import React from 'react'
import UserProfileDropdown from '../components/UserProfile'
import { type UserDetails } from '../interfaces/auth'

interface NavbarProps {
  height?: string
  button?: React.ReactNode
  title?: string
  backgroundColor?: string
  user: UserDetails | null
}

const Navbar: React.FC<NavbarProps> = ({ height, button, title, backgroundColor, user }) => {
  const navbarStyle: React.CSSProperties = {
    height: height ?? '60px',
    backgroundColor: backgroundColor ?? 'black',
    padding: '0 20px',
    position: 'absolute',
    width: '100%',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const titleStyle: React.CSSProperties = {
    margin: '0',
    textAlign: 'center',
    marginLeft: '20px'
  }

  return (
    <div style={navbarStyle}>
      <div>{user?.auth_token != null && <UserProfileDropdown user={user} />}</div>
      <h2 style={titleStyle}>{title}</h2>
      <div
        style={{
          flex: '0.2'
        }}
      >
        {button}
      </div>
    </div>
  )
}

export default React.memo(Navbar)
