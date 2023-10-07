import React, { useEffect, useState } from 'react'
import Button from '../shared/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../utility/localStorage'
import { type UserDetails } from '../interfaces/auth'
import { categoryList, deleteCategory } from '../services/user' // Import the editCategory function
import ListComponent from './ListItem'
import { type CategoryDetails } from '../interfaces/user'
import { toast } from 'react-toastify'
import { toastMsg } from '../constants/toast-messages'

export default function Categories() {
  const navigate = useNavigate()
  const location = useLocation()
  const [categories, setCategories] = useState<CategoryDetails[] | null>(null)
  const [user, setUser] = useState<UserDetails | null>(null)

  const normalStyle = {}
  const activeStyle = { opacity: 0.5, pointerEvents: 'none' }

  const styleToApply = location.pathname === '/categories' ? activeStyle : normalStyle

  const fetchData = async () => {
    const storedUser: UserDetails | null = getLocalStorageItem('user')
    if (storedUser != null) {
      try {
        setUser(storedUser)
        const response = await categoryList(storedUser.id)
        setCategories(response.data) // Update the categories state
      } catch (error) {
        console.error('Error fetching membership details:', error)
      }
    }
  }

  useEffect(() => {
    // Fetch categories when the component mounts
    void fetchData()
  }, [])

  const handleDelete = (selectedItemId: number) => {
    deleteCategory(selectedItemId)
      .then(() => {
        toast.success(toastMsg.CATEGORY_DELETED, {
          toastId: 'delete-category'
        })
        void fetchData()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div
      style={{
        display: 'grid',
        height: '97%'
      }}
    >
      <div
        style={{
          padding: '40px 30px',
          marginTop: '80px'
        }}
      >
        {categories != null && (
          <ListComponent list={categories} onDelete={handleDelete} fetchData={fetchData} user={user}/>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          marginLeft: '5px',
          marginRight: '5px',
          marginTop: 'auto'
        }}
      >
        <Button
          title={'Expense Tracking'}
          onClick={() => {
            navigate('/expense-tracker')
          }}
        />
        <Button
          title={'Category'}
          onClick={() => {
            navigate('/categories')
          }}
          style={styleToApply}
        />
      </div>
    </div>
  )
}
