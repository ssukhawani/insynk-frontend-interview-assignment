/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { type CategoryUpdate, type CategoryDetails } from '../interfaces/user'
import Modal from '../shared/Modal'
import Button from '../shared/Button'
import { createCategory, updateCategory } from '../services/user'
import { toast } from 'react-toastify'
import { toastMsg } from '../constants/toast-messages'
import Switch from '../shared/Switch'
import { type UserDetails } from '../interfaces/auth'

interface ListComponentProps {
  list: CategoryDetails[]
  onDelete: (id: number) => void
  addBorder?: boolean
  fetchData: () => Promise<void>
  user: UserDetails | null
}

const ListComponent: React.FC<ListComponentProps> = ({
  list,
  onDelete,
  addBorder = true,
  fetchData,
  user
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // This is realted to editing or updating
  const [isEditing, setIsEditing] = useState<number | null>(null) // Track editing state
  const [editedCategory, setEditedCategory] = useState<CategoryUpdate | null>(null) // Store changes made during editing
  const [isMainSwitch, setIsMainSwitch] = useState<boolean>(false)

  // State for new category creation
  const [newCategoryName, setNewCategoryName] = useState<string>('')
  const [isMainSwitchNew, setIsMainSwitchNew] = useState<boolean>(false)

  // this is just to check mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // This is related to deleting the category
  const handleDeleteClick = (id: number, name: string) => {
    setSelectedItemId(id)
    setSelectedItem(name)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setSelectedItemId(null)
    setSelectedItem(null)
    setIsModalOpen(false)
  }

  const handleConfirm = () => {
    if (selectedItemId !== null) {
      onDelete(selectedItemId)
      setSelectedItemId(null)
      setSelectedItem(null)
      setIsModalOpen(false)
    }
  }

  // This is for updating
  const handleEdit = (categoryIndex: number, id: number) => {
    setIsEditing(id)
    const categoryToEdit = list[categoryIndex]
    if (categoryToEdit != null) {
      setEditedCategory(categoryToEdit)
      setIsMainSwitch(categoryToEdit.is_main)
    }
  }

  const handleCancelEdit = () => {
    setTimeout(() => {
      setEditedCategory(null)
      setIsEditing(null)
    }, 0)
  }

  const handleResetNewCategories = () => {
    setTimeout(() => {
      setNewCategoryName('')
    }, 100)
  }

  const handleUpdateCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEditedCategory({ ...(editedCategory as CategoryUpdate), name: value })
  }

  const updateCategoryDb = async (categoryId: number, updatedCategory: CategoryUpdate | null) => {
    try {
      await updateCategory(categoryId, updatedCategory)
      toast.success(toastMsg.CATEGORY_UPDATED, {
        toastId: 'update-category'
      })
      handleCancelEdit()
      void fetchData()
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  // This is for controlling switch component
  const handleSwitchChange = (value: boolean) => {
    setIsMainSwitch(value)
    setEditedCategory((prevCategory) => ({
      ...(prevCategory as CategoryUpdate),
      is_main: value
    }))
  }

  // Creating new category handlers
  const handleCreateCategory = async () => {
    try {
      if (newCategoryName.trim() === '') {
        // Check if the category name is empty
        toast.error(toastMsg.CATEGORY_EMPTY, {
          toastId: 'create-category-error'
        })
        return
      }

      const newCategory: CategoryUpdate = {
        name: newCategoryName,
        is_main: isMainSwitchNew,
        user: parseInt((user as UserDetails).id)
      }

      // Make an API call to create the new category
      await createCategory(newCategory)

      // Fetch updated data and reset input fields
      handleCancelEdit()
      // reset state
      handleResetNewCategories()
      void fetchData()

      toast.success(toastMsg.CATEGORY_CREATED, {
        toastId: 'create-category-success'
      })
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  const memoizedList = React.useMemo(
    () =>
      list.map((item, index) => (
        <li
          key={item.id}
          style={{
            borderBottom: addBorder ? '1px solid #ccc' : 'none',
            paddingBottom: addBorder ? '10px' : '0',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span
            style={{ flex: '1' }}
            onClick={() => {
              if (!item.is_main) {
                handleEdit(index, item.id)
              }
            }}
          >
            {isEditing === item.id ? (
              <input
                type='text'
                value={editedCategory?.name ?? ''}
                onChange={handleUpdateCategory}
                style={{
                  borderBottom: addBorder ? '1px solid #ccc' : 'none',
                  paddingBottom: addBorder ? '10px' : '0',
                  maxWidth: '90%'
                }}
              />
            ) : (
              item.name
            )}
          </span>
          {!item.is_main && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isEditing === item.id ? (
                <div style={{ display: 'flex', gap: '5px' }}>
                  <Switch initialValue={isMainSwitch} onChange={handleSwitchChange} small />
                  <span
                    onClick={() => {
                      void updateCategoryDb(item.id, editedCategory)
                    }}
                    style={{
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    ✔️
                  </span>
                  <span
                    onClick={handleCancelEdit}
                    style={{
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleDeleteClick(item.id, item.name)
                  }}
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                >
                  X
                </button>
              )}
            </div>
          )}
        </li>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list, isEditing, editedCategory, setEditedCategory, handleCancelEdit]
  )

  return (
    <div style={{ marginBottom: '2rem', width: '100%' }}>
      <ul
        style={{
          overflowY: 'scroll',
          maxHeight: '60vh',
          padding: '0 30px'
        }}
      >
        {memoizedList}
      </ul>
      {/* Input box for creating a new category */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', padding: '0 30px' }}>
        <input
          type='text'
          value={newCategoryName}
          onChange={(e) => {
            setNewCategoryName(e.target.value)
          }}
          placeholder='New Category Name'
          style={{ flex: 1, marginRight: '20px', maxWidth: isMobile ? '63%' : '70%' }}
        />
        <div style={{ flex: '0.2' }}></div>
        <div style={{ marginTop: '10px' }}>
          <Switch initialValue={isMainSwitchNew} onChange={setIsMainSwitchNew} small />
        </div>
        <Button
          onClick={handleCreateCategory}
          title={isMobile ? '+' : 'Add'} // Use + for mobile and Add for larger screens
          style={{
            flex: isMobile ? '' : '0.3', // Adjust the flex value as needed
            height: '34px',
            borderRadius: '5px',
            marginLeft: isMobile ? '' : '10px'
          }}
        />
      </div>
      <Modal isOpen={isModalOpen}>
        <div
          style={{
            height: '100%',
            width: '100%'
          }}
        >
          <div className='modal-text'>
            <ul>
              <li>{selectedItem} will be removed</li>
              <li>All expenses with this category will also be removed</li>
            </ul>
            <p>Do you really want to remove?</p>
          </div>
          <div className='modal-button-div'>
            <Button
              title={'Cancel'}
              onClick={handleCancel}
              style={{
                opacity: 0.6,
                background: 'white',
                color: 'black',
                border: 'black 1px solid'
              }}
            />
            <Button title={'Confirm'} onClick={handleConfirm} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ListComponent
