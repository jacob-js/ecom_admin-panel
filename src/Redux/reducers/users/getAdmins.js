import usersActionsTypes from "../../actionsTypes/users";

const getAdmins = (state, {type, payload}) =>{
    switch (type) {
        case usersActionsTypes.GET_ADMINS_START:
            return{
                ...state,
                admins: {
                    ...state.admins,
                    loading: true,
                    error: null
                }
            }

        case usersActionsTypes.GET_ADMINS_SUCCESS:
            return{
                ...state,
                admins: {
                    ...state.admins,
                    loading: false,
                    data: payload
                }
            }

        case usersActionsTypes.GET_ADMINS_ERROR:
            return{
                ...state,
                admins: {
                    ...state.admins,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getAdmins;