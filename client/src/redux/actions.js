import { SEARCH, BOOK, FAVORITE } from "./actionTypes";

export const updateSearchQuery = (action) => {
  const search_query = action.target.value;
  return {
    type: SEARCH.UPDATE_QUERY,
    payload: { search_query }
  };
};

export const toggleBookModal = () => {
  return {
    type: BOOK.TOGGLE_MODAL
  };
};

export const addToFavorite = (book) => {
  return {
    type: FAVORITE.ADD,
    book
  };
};

export const removeFromFavorite = (book) => {
  return {
    type: FAVORITE.REMOVE,
    book
  };
};

export const toggleFavorite = () => {
  return {
    type: BOOK.TOGGLE_FAVORITE
  };
};
