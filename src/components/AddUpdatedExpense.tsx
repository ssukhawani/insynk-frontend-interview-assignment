/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../shared/Button'
import Select from '../shared/Select'
import DatePicker from '../shared/DatePicker'
import '../css/AddUpdatedExpense.css' // Import your CSS file
import { type ExpenseUpdate } from '../interfaces/user'
import ButtonSwitch from '../shared/ButtonSwitch'
import { categoryList, createExpense, updateExpense } from '../services/user'
import { type UserDetails } from '../interfaces/auth'
import { getLocalStorageItem } from '../utility/localStorage'
import { toast } from 'react-toastify'
import { toastMsg } from '../constants/toast-messages'

export default function AddUpdatedExpense() {
  const navigate = useNavigate()
  const location = useLocation()
  const isUpdateExpense = location.pathname.includes('/update-expense')

  const normalStyle = {}
  const activeStyle = { opacity: 0.5 }

  const match = location.pathname.match(/^\/update-expense\/(\d+)$/)

  const styleToApply =
    location.pathname === '/add-expense' || match != null ? activeStyle : normalStyle

  const initState = {
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    description: '',
    type: 'IN',
    category: '',
    user: ''
  }

  const [formData, setFormData] = useState<ExpenseUpdate>(JSON.parse(JSON.stringify(initState)))
  const [categoryOptions, setCategoryOptions] = useState<Array<{ value: string, label: string }>>(
    []
  )
  const [user, seUser] = useState<UserDetails | null>(null)

  useEffect(() => {
    // Fetch the category list data when the component mounts
    async function fetchCategoryList() {
      const storedUser: UserDetails | null = getLocalStorageItem('user')
      if (storedUser != null) {
        try {
          seUser(storedUser)
          const response = await categoryList(storedUser.id)
          const categoryData = response.data

          // Map category data to options with value (category ID) and label (category name)
          const options = categoryData.map((category: any) => ({
            value: category.id.toString(),
            label: category.name
          }))

          setCategoryOptions(options)
        } catch (error) {
          console.error('Error fetching category list:', error)
        }
      }
    }

    void fetchCategoryList()
  }, []) // Fetch category list only once when the component mounts

  useEffect(() => {
    // If this is an update operation, populate the form with the existing data
    if (isUpdateExpense && Boolean(location.state)) {
      const { amount, date, description, type, category, user } = location.state
      setFormData({
        amount,
        date,
        description,
        type,
        category: category.toString(),
        user: user.toString()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateExpense])

  // Create a separate event handler for the Select component
  const handleCategoryChange = (value: string) => {
    // Update the category value in the form data
    setFormData({
      ...formData,
      category: value
    })
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    const { amount, date, description, type, category } = formData

    // check if user has category created or not
    if (categoryOptions.length === 0) {
      toast.info(toastMsg.CREATE_CATEGORY, {
        toastId: 'create-category'
      })
      navigate('/categories')
      return
    }

    if (!category || !Boolean(amount) || !description.trim() || !type) {
      toast.error(toastMsg.ALL_FIELDS_REQUIRED, {
        toastId: 'cant-create-category'
      })
      return
    }

    // Prepare the expense data to send to the API
    const expenseData = {
      amount,
      date,
      description,
      type,
      category: parseInt(category as string),
      user: user?.id
    }

    if (isUpdateExpense) {
      // Update expense api
      const expenseId = location.state.id
      await updateExpense(expenseId, expenseData as ExpenseUpdate)
      toast.info(toastMsg.EXPENSE_UPDATED, {
        toastId: 'expense-updated'
      })
    } else {
      // Add expense api
      await createExpense(expenseData as ExpenseUpdate)
      toast.success(toastMsg.EXPENSE_CREATED, {
        toastId: 'expense-created'
      })
    }

    // reset the form to its initial state
    setFormData(JSON.parse(JSON.stringify(initState)))

    // Redirect to the expense tracker page after submission
    navigate('/expense-tracker')
  }

  return (
    <div
      style={{
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
        gap: '1rem'
      }}
    >
      <header>
        <div style={{ textAlign: 'center' }}>
          <h1>Add New Expense</h1>
        </div>
      </header>
      <main className='expense-form'>
        <div className='form'>
          <div className='form-group'>
            <div className='input-container'>
              {/* ButtonSwitch component for cash in & cash out */}
              <ButtonSwitch
                label='Type'
                options={[
                  { label: 'Cash In', value: 'IN' },
                  { label: 'Cash Out', value: 'OUT' }
                ]}
                selectedOption={formData.type}
                onChange={(type) => {
                  setFormData({ ...formData, type })
                }}
              />
            </div>
          </div>
          <div className='form-group'>
            <label>
              Category:
              <Select
                name='category'
                value={formData.category as string}
                onChange={handleCategoryChange}
                options={categoryOptions}
                required
              />
            </label>
          </div>
          <div className='form-group'>
            <div className='input-container'>
              <label>
                Amount (₹):
                <input
                  type='number'
                  name='amount'
                  value={formData.amount}
                  onChange={handleInputChange}
                  className='input-field'
                  required
                />
              </label>
            </div>
          </div>
          <div className='form-group'>
            <label>
              Date (dd/mm/yy) :
              <div className='input-container'>
                <DatePicker
                  name='date'
                  value={formData.date}
                  onChange={(date) => {
                    setFormData({
                      ...formData,
                      date: date.toISOString().slice(0, 10)
                    })
                  }}
                  required
                />
              </div>
            </label>
          </div>
          <div className='form-group'>
            <div className='input-container'>
              <label>
                Description:
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  className='input-field'
                  required
                />
              </label>
            </div>
          </div>
        </div>
      </main>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5px',
          padding: '1rem'
        }}
      >
        <Button
          title={'Cancel'}
          onClick={() => {
            navigate('/expense-tracker')
            setFormData(JSON.parse(JSON.stringify(initState)))
          }}
          style={styleToApply}
        />
        <Button
          title={location.pathname === '/add-expense' ? 'Add' : 'Update'}
          onClick={handleFormSubmit}
        />
      </footer>
    </div>
  )
}
