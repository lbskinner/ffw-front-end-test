import { combineReducers } from "redux";

const tabsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TAB_DATA":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tabsReducer,
});

export default rootReducer;
