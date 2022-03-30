import initialStates from "../../initialStates";
import getProducts from "./getProducts";

const products = (state=initialStates.products, action={})=>({
    ...state,
    ...getProducts(state, action)
});

export default products;