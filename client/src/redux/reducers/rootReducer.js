import { BOOK, FAVORITE, QUERY, SEARCH } from "../actionTypes";
import {
  default_book_info,
  default_book_info2,
  default_book_info3
} from "./placeholder";

const initialState = {
  results: null,
  loading: false,
  search_results: [default_book_info, default_book_info2, default_book_info3],
  search_filters: null,
  search_query: null,
  favorites: {
    [default_book_info.BOOK_ID]: default_book_info,
    [default_book_info2.BOOK_ID]: default_book_info2,
    [default_book_info3.BOOK_ID]: default_book_info3
  },
  book_modal_visible: false,
  book_modal_info: default_book_info
};

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case QUERY.POPULAR_BOOKS:
    case QUERY.BEST_REVIEWS:
    case QUERY.MOST_CONSISTENT_AUTHOR:
    case QUERY.HIGHEST_RATED_BOOKS_PER_GENRE_YEAR:
    case QUERY.MOST_CONTROVERSIAL_BOOKS:
    case QUERY.ONE_HIT_WONDER:
    case QUERY.PROLIFIC_AUTHOR:
    case QUERY.CROSS_GENRE_AUTHOR:
    case QUERY.MOST_GENRE_AUTHOR:
      return { ...state, loading: true };
    case QUERY.UPDATE_RESULTS:
      return { ...state, results: action.json, loading: false };
    case SEARCH.UPDATE_FILTERS:
      return { ...state, filters: null };
    case SEARCH.UPDATE_QUERY:
      const { query } = action.payload;
      return { ...state, query };

    case SEARCH.UPDATE_RESULTS:
      return { ...state, search_results: action.json, loading: false };

    case FAVORITE.ADD:
      return { favorites: [] };

    case FAVORITE.REMOVE:
      return { favorites: [] };

    case FAVORITE.UPDATE:
      return { favorites: [] };

    case BOOK.TOGGLE_FAVORITE:
      const book_modal_favorite = state.favorites.hasOwnProperty(
        state.book_modal_info.BOOK_ID
      );
      if (book_modal_favorite == false) {
        return {
          ...state,
          favorites: {
            ...state.favorites,
            [state.book_modal_info.BOOK_ID]: state.book_modal_info
          }
        };
      } else {
        const {
          [state.book_modal_info.BOOK_ID]: temp,
          ...rest
        } = state.favorites;
        return {
          ...state,
          favorites: rest
        };
      }
    case BOOK.UPDATE_SHOW_MODAL:
      return {
        ...state,
        book_modal_info: action.book,
        book_modal_visible: true
      };
    case BOOK.SHOW_MODAL:
      return { ...state, book_modal_visible: true };
    case BOOK.HIDE_MODAL:
      return { ...state, book_modal_visible: false };
    case BOOK.TOGGLE_MODAL:
      return { ...state, book_modal_visible: !state.book_modal_visible };
    case SEARCH.UPDATE_FILTERS: {
      return {
        ...state,
        search_filters: null
      };
    }
    case SEARCH.UPDATE_QUERY: {
      const { search_query } = action.payload;
      return {
        ...state,
        search_query
      };
    }
    case SEARCH.UPDATE_RESULTS: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
