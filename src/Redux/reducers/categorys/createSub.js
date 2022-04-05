import categorysActionTypes from "../../actionsTypes/categorys";

const createSub = (state, {type, payload}) =>{
    switch (type) {
        case categorysActionTypes.CREATE_SUB_CATEGORY_START:
            return {
                ...state,
                createSub: {
                    ...state.createSub,
                    loading: true,
                    error: null
                }
            }

        case categorysActionTypes.CREATE_SUB_CATEGORY_SUCCESS:
            return {
                ...state,
                createSub: {
                    ...state.createSub,
                    loading: false,
                    error: null,
                    data: payload
                },
                subs: {
                    ...state.subs,
                    data: [...state.subs.data, {...payload, Category:
                        state.categorys.data.find(categ => categ.id === payload.categId)
                    }]
                }
            }

        case categorysActionTypes.CREATE_SUB_CATEGORY_ERROR:
            return {
                ...state,
                createSub: {
                    ...state.createSub,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default createSub;