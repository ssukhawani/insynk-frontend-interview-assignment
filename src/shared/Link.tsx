import React from 'react'
import { Link } from 'react-router-dom' // Import the Link component from React Router
import '../css/Link.css'

interface LinkProps {
  to: string
  prefixText?: string
  linkText: string
}

const CustomLink: React.FC<LinkProps> = ({ to, linkText, prefixText }) => {
  return (
    <p className='custom-signup-link'>
      {prefixText}
      <Link to={to} className='custom-link'>
        {linkText}
      </Link>
    </p>
  )
}

export default CustomLink
