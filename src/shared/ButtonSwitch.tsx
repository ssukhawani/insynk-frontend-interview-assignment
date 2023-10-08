import React from 'react'
import '../css/ButtonSwitch.css'

interface ButtonSwitchProps {
  label: string
  options: Array<{ label: string, value: string }>
  selectedOption: string
  onChange: (option: string) => void
}

const ButtonSwitch: React.FC<ButtonSwitchProps> = ({
  label,
  options,
  selectedOption,
  onChange
}) => (
  <div className='button-switch' style={{ display: 'block' }}>
    <p>{label}:</p>
    <div className='switch-options'>
      {options.map((option) => (
        <button
          key={option.value}
          type='button' // Set the type attribute to "button" to prevent form submission
          className={`switch-button ${option.value === selectedOption ? 'active' : ''}`}
          onClick={() => {
            onChange(option.value)
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
)

export default ButtonSwitch
