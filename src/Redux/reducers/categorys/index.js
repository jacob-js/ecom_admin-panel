import initialStates from "../../initialStates";
import createCategory from "./createCategory";
import createProductType from "./createProductType";
import createSub from "./createSub";
import getCategorys from "./getCategorys";
import getProductTypes from "./getProductTypes";
import getSubs from "./getSubs";

const categorys =(state=initialStates.categorys, action={})=>({
    ...state,
    ...getProductTypes(state, action),
    ...createProductType(state, action),
    ...getCategorys(state, action),
    ...createCategory(state, action),
    ...getSubs(state, action),
    ...createSub(state, action)
});

export default categorys;