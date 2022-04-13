import usersActionsTypes from "../../actionsTypes/users";

const deleteAdmin = (state, {type, payload}) =>{
    switch (type) {
        case usersActionsTypes.DELETE_ADMIN_START:
            return{
                ...state,
                deleteAdmin: {
                    ...state.deleteAdmin,
                    loading: true,
                    id: payload
                }
            };

        case usersActionsTypes.DELETE_ADMIN_SUCCESS:
            state.admins.data = state.admins.data?.filter(adim => adim.id !== payload);
            return{
                ...state,
                deleteAdmin: {
                    ...state.deleteAdmin,
                    loading: false
                }
            }

        case usersActionsTypes.DELETE_ADMIN_ERROR:
            return{
                ...state,
                deleteAdmin: {
                    ...state.deleteAdmin,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default deleteAdmin;