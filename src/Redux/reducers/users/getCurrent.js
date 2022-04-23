import usersActionsTypes from "../../actionsTypes/users";

const getCurrent = (state, {type, payload}) => {
    switch (type) {
        case usersActionsTypes.GET_CURRENT_USER_START:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: true,
                    error: null,
                    auth: null
                }
            }

        case usersActionsTypes.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: null,
                    auth: true,
                    data: payload
                }
            }

        case usersActionsTypes.GET_CURRENT_USER_ERROR:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: payload,
                    auth: false
                }
            }

        case 'UPDATE_USER':
            return{
                ...state,
                currentUser: {
                    ...state.currentUser,
                    data: payload
                }
            }
    
        default:
            break;
    }
};

export default getCurrent;