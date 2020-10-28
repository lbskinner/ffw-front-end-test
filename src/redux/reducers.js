import { combineReducers } from "redux";

const tabsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TAB_DATA":
      return action.payload;
    default:
      return state;
  }
};

const myFontsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MY_FONTS":
      return action.payload;
    default:
      return state;
  }
};

const buyFontsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_BUY_FONTS":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tabsReducer,
  myFontsReducer,
  buyFontsReducer,
});

export default rootReducer;
