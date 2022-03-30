import axios from "axios";
import productsActionsTypes from "../actionsTypes/products"

export const getProductsAction = (offset, limit) => async(dispatch) =>{
    dispatch({ type: productsActionsTypes.GET_PRODUCTS_START });
    try {
        const res = await axios.get(`/api/v1/products?offset=${offset}&limit=${limit}`);
        if(res.status === 200){
            dispatch({
                type: productsActionsTypes.GET_PRODUCTS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: productsActionsTypes.GET_PRODUCTS_ERROR,
                payload: res.data?.message
            })
        }else{
            getProductsAction(offset, limit)(dispatch)
        }
    }
}