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
            axios.defaults.headers.common['auth_token'] = localStorage.getItem('authtoken');
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
} 