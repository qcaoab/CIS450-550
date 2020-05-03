import { SEARCH, BOOK, FAVORITE, QUERY, DISCOVER, AUTHOR } from "./actionTypes";

export const updateSearchQuery = (action) => {
  const search_query = action.tRarget.value;
  return {
    type: SEARCH.UPDATE_QUERY,
    payload: { search_query }
  };
};

export const submitSearch = () => {
  return { type: SEARCH.SUBMIT_SEARCH };
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

export const updateAndShowBookModal = (book) => {
  return {
    type: BOOK.UPDATE_SHOW_MODAL,
    book
  };
};

export const getPopularBooks = () => {
  return { type: QUERY.POPULAR_BOOKS };
};

export const discoverBooks = () => {
  return { type: DISCOVER.QUERY_BOOKS };
};

export const executeQuery = (query) => {
  return { type: QUERY.EXECUTE_QUERY, query: query };
};

export const getAuthorBooks = (author_id) => {
  return { type: AUTHOR.GET_BOOKS, author_id };
};

export const getBookReviews = (book_id) => {
  return { type: BOOK.GET_REVIEWS, book_id };
};
