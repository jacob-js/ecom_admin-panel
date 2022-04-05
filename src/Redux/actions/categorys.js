import axios from "axios";
import categorysActionTypes from "../actionsTypes/categorys"

export const getProductTypesAction = async(dispatch) =>{
    dispatch({ type: categorysActionTypes.GET_PRODUCT_TYPES_REQUEST });
    try {
        const res = await axios.get(`/api/v1/categorys/parents/categorys`);
        if(res.status === 200){
            dispatch({
                type: categorysActionTypes.GET_PRODUCT_TYPES_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: categorysActionTypes.GET_PRODUCT_TYPES_ERROR,
                payload: res.data.message
            })
        }else{
            getProductTypesAction(dispatch)
        }
    }
};

export const createProductTypeAction = (data) =>async(dispatch, cb) =>{
    dispatch({ type: categorysActionTypes.CREATE_PRODUCT_TYPE_START });
    try {
        const res = await axios.post(`/api/v1/categorys/parents/categorys`, data);
        if(res.status === 201){
            dispatch({
                type: categorysActionTypes.CREATE_PRODUCT_TYPE_SUCCESS,
                payload: res.data.data
            });
            cb(true)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: categorysActionTypes.CREATE_PRODUCT_TYPE_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: categorysActionTypes.CREATE_PRODUCT_TYPE_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const getCategorysAction = async(dispatch) =>{
    dispatch({
        type: categorysActionTypes.GET_CATEGORYS_REQUEST
    });
    try {
        const res = await axios.get(`/api/v1/categorys`);
        if(res.status === 200){
            dispatch({
                type: categorysActionTypes.GET_CATEGORYS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: categorysActionTypes.GET_CATEGORYS_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: categorysActionTypes.GET_CATEGORYS_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const createCategoryAction = (data) =>async(dispatch, cb) =>{
    dispatch({
        type: categorysActionTypes.CREATE_CATEGORY_START
    });
    try {
        const res = await axios.post(`/api/v1/categorys`, data);
        if(res.status === 201){
            dispatch({
                type: categorysActionTypes.CREATE_CATEGORY_SUCCESS,
                payload: res.data.data
            });
            cb(true)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: categorysActionTypes.CREATE_CATEGORY_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: categorysActionTypes.CREATE_CATEGORY_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const getSubCategorysAction = async(dispatch) =>{
    dispatch({
        type: categorysActionTypes.GET_SUB_CATEGORYS_START
    });
    try {
        const res = await axios.get(`/api/v1/categorys/subs/categorys`);
        if(res.status === 200){
            dispatch({
                type: categorysActionTypes.GET_SUB_CATEGORYS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: categorysActionTypes.GET_SUB_CATEGORYS_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: categorysActionTypes.GET_SUB_CATEGORYS_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}

export const createSubCategoryAction = (data) =>async(dispatch, cb) =>{
    dispatch({
        type: categorysActionTypes.CREATE_SUB_CATEGORY_START
    });
    try {
        const res = await axios.post(`/api/v1/categorys/subs/categorys`, data);
        if(res.status === 201){
            dispatch({
                type: categorysActionTypes.CREATE_SUB_CATEGORY_SUCCESS,
                payload: res.data.data
            });
            cb(true)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: categorysActionTypes.CREATE_SUB_CATEGORY_ERROR,
                payload: res.data?.message
            })
        }else{
            dispatch({
                type: categorysActionTypes.CREATE_SUB_CATEGORY_ERROR,
                payload: error?.message || 'Erreur de chargement, veuillez réessayer'
            })
        }
    }
}