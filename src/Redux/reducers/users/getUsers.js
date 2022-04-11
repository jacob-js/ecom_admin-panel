import usersActionsTypes from "../../actionsTypes/users";

const getUsers = (state, {type, payload}) =>{
    switch (type) {
        case usersActionsTypes.GET_USERS_START:
            return{
                ...state,
                users: {
                    ...state.users,
                    loading: true,
                    error: null
                }
            }

        case usersActionsTypes.GET_USERS_SUCCESS:
            return{
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    data: payload,
                    count: payload.count,
                    rows: payload.rows
                }
            }

        case usersActionsTypes.GET_USERS_ERROR:
            return{
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getUsers;