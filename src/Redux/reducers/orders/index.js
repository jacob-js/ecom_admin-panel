import initialStates from "../../initialStates";
import getAll from "./getAll";

const orders = (state=initialStates.orders, action) =>({
    ...state,
    ...getAll(state, action)
});

export default orders;