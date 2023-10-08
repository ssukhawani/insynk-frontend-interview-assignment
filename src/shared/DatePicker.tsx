// DatePicker.tsx

import React from 'react'
import '../css/DatePicker.css' // Import the corresponding CSS

interface DatePickerProps {
  name: string
  value: string
  onChange: (date: Date) => void
  required?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({ name, value, onChange, required }) => (
  <div className='date-picker-container'>
    <input
      type='date'
      className='date-picker'
      name={name}
      value={value}
      onChange={(e) => {
        onChange(new Date(e.target.value))
      }}
      required={required}
    />
  </div>
)

export default DatePicker
