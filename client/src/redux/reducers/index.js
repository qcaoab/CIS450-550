import { combineReducers } from "redux";
import search from "./searchReducers";
import favorite from "./favoriteReducers";
import book from "./bookReducers";

export default combineReducers({
  search,
  favorite,
  book
});
