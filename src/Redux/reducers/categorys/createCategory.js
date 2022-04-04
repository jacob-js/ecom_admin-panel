import categorysActionTypes from "../../actionsTypes/categorys";

const createCategory = (state, {type, payload}) => {
    switch (type) {
        case categorysActionTypes.CREATE_CATEGORY_START:
            return{
                ...state,
                createCategory: {
                    ...state.createCategory,
                    loading: true,
                    error: null
                }
            }
            
        case categorysActionTypes.CREATE_CATEGORY_SUCCESS:
            return{
                ...state,
                createCategory: {
                    ...state.createCategory,
                    loading: false,
                    error: null,
                    data: payload
                },
                categorys: {
                    ...state.categorys,
                    data: [...state.categorys.data, payload]
                }
            }
            
        case categorysActionTypes.CREATE_CATEGORY_ERROR:
            return{
                ...state,
                createCategory: {
                    ...state.createCategory,
                    loading: false,
                    error: payload
                }
            }
            
        default:
            break;
    }
};

export default createCategory;