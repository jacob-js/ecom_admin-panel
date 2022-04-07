import productsActionsTypes from "../../actionsTypes/products";

const update = (state, {type, payload}) =>{
    switch (type) {
        case productsActionsTypes.UPDATE_PRODUCT_START:
            return{
                ...state,
                updateProduct: {
                    ...state.updateProduct,
                    loading: true,
                    error: null
                }
            }

        case productsActionsTypes.UPDATE_PRODUCT_SUCCESS:
            return{
                ...state,
                updateProduct: {
                    ...state.updateProduct,
                    loading: false,
                    error: null,
                    data: payload
                },
                products: {
                    ...state.products,
                    rows: [...state.products.rows.filter(prod => prod.id !== payload.id), payload]
                }
            }

        case productsActionsTypes.UPDATE_PRODUCT_ERROR:
            return{
                ...state,
                updateProduct: {
                    ...state.updateProduct,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default update;