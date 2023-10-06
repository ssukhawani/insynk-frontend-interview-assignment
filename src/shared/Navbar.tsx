import React from 'react'

interface NavbarProps {
  height?: string
  button?: React.ReactNode
  title?: string
  backgroundColor?: string
}

const Navbar: React.FC<NavbarProps> = ({ height, button, title, backgroundColor }) => {
  const navbarStyle: React.CSSProperties = {
    display: 'grid',
    alignItems: 'center',
    height: height ?? '50px',
    backgroundColor: backgroundColor ?? '#C4D7EE',
    padding: '0 20px',
    position: 'absolute',
    width: '100%'
  }

  const titleStyle: React.CSSProperties = {
    margin: '0',
    textAlign: 'center'
  }

  return (
    <div style={navbarStyle}>
      <h2 style={titleStyle}>{title}</h2>
      {button}
    </div>
  )
}

export default Navbar
