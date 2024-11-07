import { combineReducers } from "redux";
import authReducer from "../auth/authSlice"; // counterSlice 가져오기

const rootReducer = combineReducers({
    auth: authReducer, // 리듀서 결합
});

export default rootReducer;
