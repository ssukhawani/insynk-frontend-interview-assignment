import React from 'react'
import Button from '../shared/Button'
import expenseTrackerAnimation from '../images/expense-animation.json'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'

export default function PublicPage() {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'grid',
        height: '98vh',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
        gap: '1rem'
      }}
    >
      <header>
        <div style={{ textAlign: 'center', visibility: 'hidden' }}>
          <h1>Expense Tracker Application</h1>
        </div>
      </header>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Lottie style={{ marginTop: '100px' }} animationData={expenseTrackerAnimation} height={400} width={400} />
      </main>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5px',
          padding: '1rem 2rem'
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
      </footer>
    </div>
  )
}
