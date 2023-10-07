import React from 'react'
import '../css/Modal.css'

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  return isOpen
    ? (
      <div className='modal-overlay'>
        <div className='modal'>{children}</div>
      </div>)
    : null
}

export default Modal
