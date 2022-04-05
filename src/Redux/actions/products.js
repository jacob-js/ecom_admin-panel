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

export const createProduct = (data) => async(dispatch, cb) =>{
    dispatch({ type: productsActionsTypes.CREATE_PRODUCT_START });
    try {
        const res = await axios.post(`/api/v1/products`, data);
        if(res.status === 201){
            dispatch({
                type: productsActionsTypes.CREATE_PRODUCT_SUCCESS,
                payload: res.data.data
            });
            cb(true)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: productsActionsTypes.CREATE_PRODUCT_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: productsActionsTypes.CREATE_PRODUCT_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}