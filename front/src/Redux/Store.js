import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducers from "./reducer/auth.reducer";

const rootReducer = combineReducers({
  auth: authReducers,
});

const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default Store;
