import { combineReducers, createStore } from "redux";
import initialStates from "./initialStates";
import reducers from "./reducers";

const store = createStore(combineReducers(reducers), initialStates);

export default store;