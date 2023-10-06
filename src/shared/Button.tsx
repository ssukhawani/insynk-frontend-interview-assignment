import React, { type ButtonHTMLAttributes } from 'react'
import '../css/Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  color?: string
}

const Button: React.FC<ButtonProps> = ({ title, color, ...rest }) => {
  return (
    <button className='button' {...rest}>
      {title}
    </button>
  )
}

export default Button
