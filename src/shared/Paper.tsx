import React, { type ReactNode } from 'react'

interface ReusablePaperProps {
  children: ReactNode
  width?: string
  height?: string
}

const Paper: React.FC<ReusablePaperProps> = ({ children, width, height }) => {
  const paperStyle: React.CSSProperties = {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Small shadow
    width: width ?? '100%', // Responsive width
    height: height ?? 'auto', // Configurable height
    position: 'relative'
  }

  return (
    <div style={paperStyle}>
      {children}
    </div>
  )
}

export default Paper
