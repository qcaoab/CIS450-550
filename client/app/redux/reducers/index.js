import { combineReducers } from "redux";
import search from "./searchReducers";
import favorite from "./favoriteReducers";

export default combineReducers({
  search,
  favorite,
});
