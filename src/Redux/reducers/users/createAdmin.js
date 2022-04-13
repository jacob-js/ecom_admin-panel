import usersActionsTypes from "../../actionsTypes/users";

const createAdmin = (state, {type, payload}) =>{
    switch (type) {
        case usersActionsTypes.CREATE_ADMIN_START:
            return{
                ...state,
                createAdmin: {
                    ...state.createAdmin,
                    loading: true,
                    error: null
                }
            }
            
        case usersActionsTypes.CREATE_ADMIN_SUCCESS:
            state.admins.data = [...state.admins.data, payload]
            return{
                ...state,
                createAdmin: {
                    ...state.createAdmin,
                    loading: false,
                    data: payload
                }
            }

        case usersActionsTypes.CREATE_ADMIN_ERROR:
            return{
                ...state,
                createAdmin: {
                    ...state.createAdmin,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default createAdmin;