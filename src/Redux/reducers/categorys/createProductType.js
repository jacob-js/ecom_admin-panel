import categorysActionTypes from "../../actionsTypes/categorys";

const createProductType = (state, {type, payload}) =>{
    switch (type) {
        case categorysActionTypes.CREATE_PRODUCT_TYPE_START:
            return{
                ...state,
                createProductType: {
                    ...state.createProductType,
                    loading: true,
                    error: null
                }
            }

        case categorysActionTypes.CREATE_PRODUCT_TYPE_SUCCESS:
            return{
                ...state,
                createProductType: {
                    ...state.createProductType,
                    loading: false,
                    error: null,
                    data: payload
                },
                productTypes: {
                    ...state.productTypes,
                    data: [...state.productTypes.data, payload]
                }
            }

        case categorysActionTypes.CREATE_PRODUCT_TYPE_ERROR:
            return{
                ...state,
                createProductType: {
                    ...state.createProductType,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default createProductType;