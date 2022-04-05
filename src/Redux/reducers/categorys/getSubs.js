import categorysActionTypes from "../../actionsTypes/categorys";

const getSubs = (state, {type, payload}) =>{
    switch (type) {
        case categorysActionTypes.GET_SUB_CATEGORYS_START:
            return{
                ...state,
                subs: {
                    ...state.subs,
                    loading: true
                }
            }
            
        case categorysActionTypes.GET_SUB_CATEGORYS_SUCCESS:
            return{
                ...state,
                subs: {
                    ...state.subs,
                    loading: false,
                    error:  null,
                    data: payload
                }
            }

        case categorysActionTypes.GET_SUB_CATEGORYS_ERROR:
            return{
                ...state,
                subs: {
                    ...state.subs,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getSubs;