import usersActionsTypes from "../../actionsTypes/users";

const signup = (state, {type, payload}) =>{
    switch (type) {
        case usersActionsTypes.SIGNUP_START:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    loading: true,
                    error: null
                }
            }

        case usersActionsTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    loading: false,
                    data: payload
                }
            }

        case usersActionsTypes.SIGNUP_ERROR:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default signup;