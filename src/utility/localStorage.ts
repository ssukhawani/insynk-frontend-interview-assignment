// Get an item from localStorage by key
export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return null
    }
    return JSON.parse(item)
  } catch (error) {
    console.error(`Error getting localStorage item ${key}`)
    return null
  }
}

// Set an item in localStorage by key
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error setting localStorage item ${key}`)
  }
}

// Update an item in localStorage by key (merges with existing data)
export const updateLocalStorageItem = <T>(key: string, update: Partial<T>): void => {
  try {
    const existingItem = getLocalStorageItem<T>(key)
    if (existingItem !== null) {
      const updatedItem = { ...existingItem, ...update }
      setLocalStorageItem(key, updatedItem)
    }
  } catch (error) {
    console.error(`Error updating localStorage item ${key}`)
  }
}

// Delete an item from localStorage by key
export const deleteLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error deleting localStorage item ${key}`)
  }
}
