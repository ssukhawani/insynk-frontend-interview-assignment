export const apiEndpoints: Record<string, string> = {
  SIGN_UP: 'auth/users/', // This is sign up and update user data ( for update need auth token)
  LOGIN: 'auth/token/login', // Login api ( username and password -->> access token )
  LOGGED_IN_USER_DETAILS: 'auth/users/me/' // Get Logged In User Details
}
