import productsActionsTypes from "../../actionsTypes/products";

const deleteProd = (state, {type, payload}) =>{
    switch (type) {
        case productsActionsTypes.DELETE_PRODUCT_START:
            return{
                ...state,
                deleteProd: {
                    ...state.deleteProd,
                    loading: true,
                    id: payload
                }
            }

        case productsActionsTypes.DELETE_PRODUCT_SUCCESS:
            state.products.rows = state.products.rows.filter(item => item.id !== payload.id);
            state.products.count = state.products.count - 1
            return{
                ...state,
                deleteProd: {
                    ...state.deleteProd,
                    loading: false,
                    error: null,
                    ...payload
                }
            }

        case productsActionsTypes.DELETE_PRODUCT_ERROR:
            return{
                ...state,
                deleteProd: {
                    ...state.deleteProd,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default deleteProd;