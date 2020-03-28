import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import search from "./searchReducers";
import favorite from "./favoriteReducers";
import todos from "./todos";

export default combineReducers({
  todos,
  visibilityFilter,
  search,
  favorite
});
