// * Profile picture API
export const RANDOM_USER_API = 'https://randomuser.me/api/'

// * Firestore DB name
export const FIRESTORE_DB_NAME = 'users'

// * Local storage data
export const LOCAL_STORAGE_ENTRY = 'user'

// <-- States for the userStore --> //

// * Create User
export const CREATE_USER_DB = 'CREATE_USER_DB'
export const FIRESTORE_ERROR_CREATE_USER = 'FIRESTORE_ERROR_CREATE_USER'
export const IMG_API_JSON_ERROR_CREATE_USER = 'IMG_API_JSON_ERROR_CREATE_USER'
export const IMG_API_RES_ERROR_CREATE_USER = 'IMG_API_RES_ERROR_CREATE_USER'
export const AUTH_ERROR_CREATE_USER_EMAIL = 'AUTH_ERROR_CREATE_USER_EMAIL'
export const AUTH_ERROR_CREATE_USER_GOOGLE = 'AUTH_ERROR_CREATE_USER_GOOGLE'

// * Login user
export const LOGIN_USER = 'LOGIN_USER'
export const FIRESTORE_ERROR_LOGIN_USER = 'FIRESTORE_ERROR_LOGIN_USER'
export const AUTH_ERROR_LOGIN_USER = 'AUTH_ERROR_LOGIN_USER'

// * Logout user
export const LOGOUT_USER = 'LOGOUT_USER'

// * Restore error
export const RESTORE_ERROR = 'RESTORE_ERROR'

// * Post tweet
export const FIRESTORE_ERROR_POST = 'FIRESTORE_ERROR_POST'
export const FIRESTORE_ERROR_GET_USER = 'FIRESTORE_ERROR_GET_USER'
export const UPDATE_FEED = 'UPDATE_FEED'
