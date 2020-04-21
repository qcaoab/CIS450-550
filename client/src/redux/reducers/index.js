import { combineReducers } from "redux";
import search from "./searchReducers";
import favorite from "./favoriteReducers";
import book from "./bookReducers";
import data from "./rootReducer";
export default combineReducers({
  data
  // search,
  // favorite,
  // book
});
