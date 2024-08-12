import { combineReducers } from "redux";
import sessionReducer from "./sessionreducer";
import activityreducer from "./activityreducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  activities: activityreducer,
});

export default rootReducer;
