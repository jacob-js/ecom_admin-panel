import usersActionsTypes from "../../actionsTypes/users";

const login = (state, {type, payload}) =>{
    switch (type) {
        case usersActionsTypes.LOGIN_START:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                    error: null
                }
            }

        case usersActionsTypes.LOGIN_SUCCESS:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: null,
                    data: payload
                },
                currentUser: {
                    ...state.currentUser,
                    auth: true,
                    data: payload,
                    error: null
                }
            }

        case usersActionsTypes.LOGIN_ERROR:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default login;