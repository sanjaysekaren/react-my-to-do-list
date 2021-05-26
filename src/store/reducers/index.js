import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardReducer";

const rootReducer = combineReducers({
  dashboardReducers: dashboardReducer,
});

export default rootReducer;
