import productsActionsTypes from "../../actionsTypes/products";

const create = (state, {type, payload}) =>{
    switch (type) {
        case productsActionsTypes.CREATE_PRODUCT_START:
            return{
                ...state,
                createProduct: {
                    ...state.createProduct,
                    loading: true,
                    error: null
                }
            }

        case productsActionsTypes.CREATE_PRODUCT_SUCCESS:
            return{
                ...state,
                createProduct: {
                    ...state.createProduct,
                    loading: false,
                    error: null,
                    data: payload
                },
                products: {
                    ...state.products,
                    rows: [...state.products.rows, payload],
                    count: state.products.count + 1
                }
            }

        case productsActionsTypes.CREATE_PRODUCT_ERROR:
            return{
                ...state,
                createProduct: {
                    ...state.createProduct,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default create;