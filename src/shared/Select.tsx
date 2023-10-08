import React, { useState, useEffect } from 'react'
import '../css/Select.css' // Import the corresponding CSS

interface Option {
  value: string
  label: string
}

interface SelectProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  required?: boolean
}

const Select: React.FC<SelectProps> = ({ name, value, onChange, options, required }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')

  // Update the selected label when the 'value' prop changes
  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value)
    setSelectedLabel(selectedOption?.label ?? 'Select an option')
  }, [value, options])

  return (
    <div className={'select-container'}>
      <div
        className={`select ${isOpen ? 'open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        onBlur={() => {
          setIsOpen(false)
        }}
        tabIndex={0}
      >
        <div className='select-header'>
          <p>{selectedLabel}</p>
          <div className='select-arrow'>
            {isOpen
              ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-chevron-up'
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <polyline points='6 15 12 9 18 15' />
                </svg>)
              : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-chevron-up'
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <polyline points='6 9 12 15 18 9' />
                </svg>)}
          </div>
        </div>
        {isOpen && (
          <ul className='select-options'>
            {options.map((option) => (
              <li
                key={option.value}
                className={`select-option ${option.value === value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Select
