import categorysActionTypes from "../../actionsTypes/categorys";

const getProductTypes = (state, {type, payload}) =>{
    switch (type) {
        case categorysActionTypes.GET_PRODUCT_TYPES_REQUEST:
            return{
                ...state,
                productTypes: {
                    ...state.productTypes,
                    loading: true,
                    error: null
                }
            }

        case categorysActionTypes.GET_PRODUCT_TYPES_SUCCESS:
            return{
                ...state,
                productTypes: {
                    ...state.productTypes,
                    loading: false,
                    error: null,
                    data: payload
                }
            }

        case categorysActionTypes.GET_PRODUCT_TYPES_ERROR:
            return{
                ...state,
                productTypes: {
                    ...state.productTypes,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getProductTypes;