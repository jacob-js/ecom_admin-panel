import productsActionsTypes from "../../actionsTypes/products";

const getProducts = (state, {type, payload}) =>{
    switch (type) {
        case productsActionsTypes.GET_PRODUCTS_START:
            return{
                ...state,
                products: {
                    ...state.products,
                    loading: true,
                    error: null
                }
            }
        case productsActionsTypes.GET_PRODUCTS_SUCCESS:
            return{
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    error: null,
                    data: payload,
                    rows: payload.rows,
                    count: payload.count
                }
            }
        case productsActionsTypes.GET_PRODUCTS_ERROR:
            return{
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default getProducts;