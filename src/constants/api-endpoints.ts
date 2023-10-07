/* eslint-disable no-template-curly-in-string */
export const apiEndpoints: Record<string, string> = {
  SIGN_UP: 'auth/users/', // This is sign up and update user data ( for update need auth token)
  LOGIN: 'auth/token/login', // Login api ( username and password -->> access token )
  LOGGED_IN_USER_DETAILS: 'api/users/me/', // Get Logged In User Details
  LOGOUT: 'auth/token/logout', // Logout api
  EXPENSE_DETAILS: 'api/expenses?user_id=${USER_ID}', // Get expense details of logged in user,
  CATEGORY_LIST: 'api/categories?user_id=${USER_ID}' // Get category list created by logged in user
}
