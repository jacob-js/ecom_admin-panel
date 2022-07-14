import axios from "axios";
import { sendNotif } from "../../Utils/helpers";
import usersActionsTypes from "../actionsTypes/users"

export const getCurrentUserAction = async(dispatch) =>{
    dispatch({
        type: usersActionsTypes.GET_CURRENT_USER_START
    });

    try {
        const res = await axios.get(`/api/v1/users/current/admin`, {
            headers: { 'bweteta_token': localStorage.getItem('auth_token') }
        });
        if(res.status === 200){
            dispatch({
                type: usersActionsTypes.GET_CURRENT_USER_SUCCESS,
                payload: res.data.data
            })
            axios.defaults.headers.common['bweteta_token'] = localStorage.getItem('auth_token');
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: usersActionsTypes.GET_CURRENT_USER_ERROR,
                payload: res.data?.error
            });
        }else{
            getCurrentUserAction(dispatch)
        }
    }
};

export const loginAction = (data) => async(dispatch, history) =>{
    dispatch({ type: usersActionsTypes.LOGIN_START });
    try {
        const res = await axios.post(`/api/v1/users/admin/login`, data);
        if(res.status === 200){
            dispatch({
                type: usersActionsTypes.LOGIN_SUCCESS,
                payload: res.data.data?.user
            });
            localStorage.setItem('auth_token', res.data.data?.token);
            axios.defaults.headers.common['bweteta_token'] = res.data.data?.token;
            const from = window.history.state?.state?.from || '/'
            history.push(from)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: usersActionsTypes.LOGIN_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: usersActionsTypes.LOGIN_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const getUsersAction = (limit, offset) => async(dispatch) =>{
    dispatch({ type: usersActionsTypes.GET_USERS_START });
    try {
        const res = await axios.get(`/api/v1/users?limit=${limit}&offset=${offset}`)
        if(res.status === 200){
            dispatch({
                type: usersActionsTypes.GET_USERS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: usersActionsTypes.GET_USERS_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: usersActionsTypes.GET_USERS_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const getAdminsAction = async(dispatch) =>{
    dispatch({ type: usersActionsTypes.GET_ADMINS_START });
    try {
        const res = await axios.get(`/api/v1/users/admins`);
        if(res.status === 200){
            dispatch({
                type: usersActionsTypes.GET_ADMINS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: usersActionsTypes.GET_ADMINS_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: usersActionsTypes.GET_ADMINS_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const createAdminAction = (data) => async (dispatch, cb) =>{
    dispatch({ type: usersActionsTypes.CREATE_ADMIN_START });
    try {
        const res = await axios.post(`/api/v1/users/admins`, data);
        if(res.status === 201){
            dispatch({
                type: usersActionsTypes.CREATE_ADMIN_SUCCESS,
                payload: res.data.data
            });
            cb(true);
            sendNotif(res.data.message, 'success')
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: usersActionsTypes.CREATE_ADMIN_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: usersActionsTypes.CREATE_ADMIN_ERROR,
                payload: error?.message
            })
        }
    }
}

export const deleteAdmin = (id) =>async(dispatch) =>{
    dispatch({ type: usersActionsTypes.DELETE_ADMIN_START, payload: id });
    try {
        const res = await axios.delete(`/api/v1/users/admins/${id}`);
        if(res.status === 200){
            dispatch({
                type: usersActionsTypes.DELETE_ADMIN_SUCCESS,
                payload: id
            });
            sendNotif(res.data.message, 'success')
        }
    } catch (error) {
        const res = error.response;
        dispatch({
            type: usersActionsTypes.DELETE_ADMIN_ERROR,
            payload: res?.data?.message || error.message
        });
        sendNotif(res?.data?.message || error.message, 'error')
    }
};

export const logoutAction = (dispatch, history) =>{
    localStorage.removeItem('auth_token');
    dispatch({
        type: usersActionsTypes.LOGOUT
    });
    history.push("/login")
}

export const signupAction = (data) => async(dispatch, history) =>{
    dispatch({ type: usersActionsTypes.SIGNUP_START });
    try {
        const res = await axios.post(`/api/v1/users`, data);
        if(res.status === 200){
            dispatch({
                type: usersActionsTypes.SIGNUP_SUCCESS,
                payload: res.data.data?.user
            });
            history.push({ pathname: '/confirm-account', state: { token: res.data.data?.token } })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: usersActionsTypes.SIGNUP_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: usersActionsTypes.SIGNUP_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const verifyAccountApi = (data) =>{
    return axios.post(`/api/v1/users/validate`, data)
};

export const sendOtpApi = (username) =>{
    return axios.get(`/users/send-otp/${username}`)
};

export const updateUser = async(id, data) =>{
    return (await axios.put(`/api/v1/users/details/${id}`, data))?.data
}