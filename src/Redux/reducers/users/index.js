import initialStates from "../../initialStates";
import getCurrent from "./getCurrent";

const users = (state = initialStates.users, action={}) =>({
    ...state,
    ...getCurrent(state, action)
});

export default users;