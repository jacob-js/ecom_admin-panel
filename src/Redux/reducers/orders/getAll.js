import ordersActionsTypes from "../../actionsTypes/orders";

const getAll = (state, {type, payload}) =>{
    switch(type){
        case ordersActionsTypes.GET_ORDERS_START:
            return{
                ...state,
                orders: {
                    ...state.orders,
                    loading: true,
                    error: null
                }
            }

        case ordersActionsTypes.GET_ORDERS_SUCCESS:
            return{
                ...state,
                orders: {
                    ...state.orders,
                    loading: false,
                    error: null,
                    ...payload
                }
            }

        case ordersActionsTypes.GET_ORDERS_FAILURE:
            return{
                ...state,
                orders: {
                    ...state.orders,
                    loading: false,
                    error: payload
                }
            }

        default:
            break;
    }
};

export default getAll;