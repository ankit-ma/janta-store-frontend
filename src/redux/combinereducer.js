import { combineReducers } from "redux";
import sessionReducer from "./sessionreducer";
import activityreducer from "./activityreducer";
import billreducer from "./billreducer";
const rootReducer = combineReducers({
  session: sessionReducer,
  activities: activityreducer,
  bills: billreducer,
});

export default rootReducer;
