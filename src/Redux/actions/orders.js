import axios from "axios";
import ordersActionsTypes from "../actionsTypes/orders"

export const getOrdersAction = (limit, offset) => async(dispatch) =>{
    dispatch({ type: ordersActionsTypes.GET_ORDERS_START });
    try {
        const res = await axios.get(`/api/v1/orders?limit=${limit}&offset=${offset}`);
        if(res.status === 200){
            dispatch({ type: ordersActionsTypes.GET_ORDERS_SUCCESS, payload: res.data.data });
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({ type: ordersActionsTypes.GET_ORDERS_FAILURE, payload: res.data.message });
        }else{
            dispatch({ type: ordersActionsTypes.GET_ORDERS_FAILURE, payload: "Echec de chargement" });
        }
    }
};

export const updateOrdersAction = async(ordersId, data) =>{
    const res = await axios.put(`/api/v1/orders/${ordersId}`, data);
    return res;
}