import initialStates from "../../initialStates";
import create from "./create";
import deleteProd from "./deleteProd";
import getProducts from "./getProducts";

const products = (state=initialStates.products, action={})=>({
    ...state,
    ...getProducts(state, action),
    ...create(state, action),
    ...deleteProd(state, action)
});

export default products;