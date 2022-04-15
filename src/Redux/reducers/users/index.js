import initialStates from "../../initialStates";
import createAdmin from "./createAdmin";
import deleteAdmin from "./deleteAdmin";
import getAdmins from "./getAdmins";
import getCurrent from "./getCurrent";
import getUsers from "./getUsers";
import login from "./login";
import signup from "./signup";

const users = (state = initialStates.users, action={}) =>({
    ...state,
    ...getCurrent(state, action),
    ...login(state, action),
    ...getUsers(state, action),
    ...getAdmins(state, action),
    ...createAdmin(state, action),
    ...deleteAdmin(state, action),
    ...signup(state, action)
});

export default users;