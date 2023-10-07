import React, { useState, useRef, useEffect } from 'react'
import '../css/UserProfile.css'
import { type UserDetails } from '../interfaces/auth'
import Button from '../shared/Button'
import { toast } from 'react-toastify'
import { toastMsg } from '../constants/toast-messages'
import { logout } from '../services/auth'
import { deleteLocalStorageItem } from '../utility/localStorage'

interface ProfileProps {
  user: UserDetails | null
}

const UserProfileDropdown: React.FC<ProfileProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  // Event listener to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current != null && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handelLogout = () => {
    // clearStoredUser();
    logout()
      .then((response) => {
        deleteLocalStorageItem('user')
        toast.success(toastMsg.LOGGED_OUT, {
          toastId: 'logout'
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className='user-profile-dropdown' ref={dropdownRef}>
      <button className='btn-secondary' onClick={toggleDropdown}>
        &#8942; {/* Three dots character */}
      </button>
      {isDropdownOpen && (
        <div className='popover'>
          <div className='user-info'>
            {user != null && <p>Hi {user.first_name} 🔥</p>}
            {/* Add user info here */}
          </div>
          <Button title={'Logout'} className='btn-danger' onClick={handelLogout} />
        </div>
      )}
    </div>
  )
}

export default UserProfileDropdown
