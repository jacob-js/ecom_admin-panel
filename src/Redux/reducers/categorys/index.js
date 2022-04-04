import initialStates from "../../initialStates";
import createCategory from "./createCategory";
import createProductType from "./createProductType";
import getCategorys from "./getCategorys";
import getProductTypes from "./getProductTypes";

const categorys =(state=initialStates.categorys, action={})=>({
    ...state,
    ...getProductTypes(state, action),
    ...createProductType(state, action),
    ...getCategorys(state, action),
    ...createCategory(state, action)
});

export default categorys;