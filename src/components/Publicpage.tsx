import React from 'react'
import Button from '../shared/Button'
import expenseTrackerGif from '../images/expense_tracker.gif'
import { useNavigate } from 'react-router-dom'

export default function PublicPage () {
  const navigate = useNavigate()
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
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img height={400} width={400} src={expenseTrackerGif} alt='Animated GIF' />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          marginTop: 'auto'
        }}
      >
        <Button
          title={'Login'}
          onClick={() => {
            navigate('/login')
          }}
        />
        <Button
          title={'Signup'}
          onClick={() => {
            navigate('/signup')
          }}
        />
      </div>
    </div>
  )
}
