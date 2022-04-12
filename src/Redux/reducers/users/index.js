import initialStates from "../../initialStates";
import getAdmins from "./getAdmins";
import getCurrent from "./getCurrent";
import getUsers from "./getUsers";
import login from "./login";

const users = (state = initialStates.users, action={}) =>({
    ...state,
    ...getCurrent(state, action),
    ...login(state, action),
    ...getUsers(state, action),
    ...getAdmins(state, action)
});

export default users;