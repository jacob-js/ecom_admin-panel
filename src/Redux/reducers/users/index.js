import initialStates from "../../initialStates";
import getCurrent from "./getCurrent";
import login from "./login";

const users = (state = initialStates.users, action={}) =>({
    ...state,
    ...getCurrent(state, action),
    ...login(state, action)
});

export default users;