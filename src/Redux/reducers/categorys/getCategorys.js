import categorysActionTypes from "../../actionsTypes/categorys";

const getCategorys = (state, {type, payload}) => {
    switch (type) {
        case categorysActionTypes.GET_CATEGORYS_REQUEST:
            return{
                ...state,
                categorys: {
                    ...state.categorys,
                    loading: true,
                    error: null
                }
            }
            
        case categorysActionTypes.GET_CATEGORYS_SUCCESS:
            return{
                ...state,
                categorys: {
                    ...state.categorys,
                    loading: false,
                    error: null,
                    data: payload
                }
            }

        case categorysActionTypes.GET_CATEGORYS_ERROR:
            return{
                ...state,
                categorys: {
                    ...state.categorys,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getCategorys;