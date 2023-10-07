// Switch.tsx
import React, { useState } from 'react'
import '../css/Switch.css'

interface SwitchProps {
  initialValue?: boolean
  onChange?: (value: boolean) => void
  small?: boolean // Added a 'small' prop to control the size.
}

const Switch: React.FC<SwitchProps> = ({ initialValue = false, onChange, small = false }) => {
  const [isChecked, setIsChecked] = useState(initialValue)

  const toggleSwitch = () => {
    const newValue = !isChecked
    setIsChecked(newValue)

    if (onChange != null) {
      onChange(newValue)
    }
  }

  const switchClassName = small ? 'switch switch-small' : 'switch'

  return (
    <label className={switchClassName} title={'is_main'}>
      <input type='checkbox' checked={isChecked} onChange={toggleSwitch} />
      <span className='slider round'></span>
    </label>
  )
}

export default Switch
