import axios from "axios";
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