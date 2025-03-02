/* eslint-disable no-template-curly-in-string */
export const apiEndpoints: Record<string, string> = {
  SIGN_UP: 'auth/users/', // This is sign up and update user data ( for update need auth token)
  LOGIN: 'auth/token/login', // Login api ( username and password -->> access token )
  LOGGED_IN_USER_DETAILS: 'api/users/me/', // Get Logged In User Details
  LOGOUT: 'auth/token/logout', // Logout api
  EXPENSE_DETAILS: 'api/expenses/?user_id=${USER_ID}', // Get expense details of logged in user,
  CATEGORY_LIST: 'api/categories/?user_id=${USER_ID}', // Get category list created by logged in user
  CATEGORY_DELETE: 'api/categories/${CAT_ID}', // remove the category
  CATEGORY_UPDATE: 'api/categories/${CAT_ID}/', // update the category
  CATEGORY_CREATE: 'api/categories/?user_id=${USER_ID}', // create new category
  EXPENSE_LIST: 'api/expenses/?user_id=${USER_ID}', // Get expense list created by logged in user
  EXPENSE_CREATE: 'api/expenses/?user_id=${USER_ID}', // crate new expense
  EXPENSE_DELETE: 'api/expenses/${EXP_ID}', // remove the expense
  EXPENSE_UPDATE: 'api/expenses/${EXP_ID}/' // update the expense
}
