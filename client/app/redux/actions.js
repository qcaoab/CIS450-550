import {
  SEARCH,
} from "./actionTypes";

export const updateSearchQuery = action => {
  const query = action.target.value;
  return {
    type: SEARCH.UPDATE_QUERY,
    payload: { query }
  };
};
