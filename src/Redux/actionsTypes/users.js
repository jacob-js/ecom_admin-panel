const usersActionsTypes = {
    GET_CURRENT_USER_START: 'GET_CURRENT_USER_START',
    GET_CURRENT_USER_ERROR: 'GET_CURRENT_USER_ERROR',
    GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',

    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',

    SIGNUP_START: 'SIGNUP_START',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_ERROR: 'SIGNUP_ERROR',

    GET_USERS_START: 'GET_USERS_START',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
    GET_USERS_ERROR: 'GET_USERS_ERROR',

    GET_ADMINS_START: 'GET_ADMINS_START',
    GET_ADMINS_SUCCESS: 'GET_ADMINS_SUCCESS',
    GET_ADMINS_ERROR: 'GET_ADMINS_ERROR',

    CREATE_ADMIN_START: 'CREATE_ADMIN_START',
    CREATE_ADMIN_SUCCESS: 'CREATE_ADMIN_SUCCESS',
    CREATE_ADMIN_ERROR: 'CREATE_ADMIN_ERROR',

    DELETE_ADMIN_START: 'DELETE_ADMIN_START',
    DELETE_ADMIN_SUCCESS: 'DELETE_ADMIN_SUCCESS',
    DELETE_ADMIN_ERROR: 'DELETE_ADMIN_ERROR',

    LOGOUT: "LOGOUT"
};

export default usersActionsTypes;