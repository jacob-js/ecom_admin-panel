import categorysActionTypes from "../../actionsTypes/categorys";

const deleteCateg = (state, {type, payload}) =>{
    switch (type) {
        case categorysActionTypes.DELETE_CATEGORY_START:
            return{
                ...state,
                deleteCateg: {
                    ...state.deleteCateg,
                    loading: true,
                    id: payload
                }
            }
        
        case categorysActionTypes.DELETE_CATEGORY_SUCCESS:
            const { type, id } = payload;
            if(type === 'categ'){
                state.categorys.data = state.categorys.data.filter(categ => categ.id !== id);
            }else if(type === 'parent'){
                state.productTypes.data = state.productTypes.data.filter(categ => categ.id !== id);
            }else{
                state.subs.data = state.subs.data.filter(categ => categ.id !== id)
            }
            return{
                ...state,
                deleteCateg: {
                    ...state.deleteCateg,
                    loading: false,
                    ...payload
                }
            }

        case categorysActionTypes.DELETE_CATEGORY_ERROR:
            return{
                ...state,
                deleteCateg: {
                    ...state.deleteCateg,
                    loading: false,
                    error: payload
                }
            }
    
        default:
            break;
    }
};

export default deleteCateg;