import initialStates from "../../initialStates";
import createProductType from "./createProductType";
import getProductTypes from "./getProductTypes";

const categorys =(state=initialStates.categorys, action={})=>({
    ...state,
    ...getProductTypes(state, action),
    ...createProductType(state, action)
});

export default categorys;