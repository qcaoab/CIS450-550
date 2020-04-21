import { BOOK, FAVORITE, QUERY, SEARCH } from "../actionTypes";
import { default_book_info } from "./placeholder";

const initialState = {
  results: null,
  loading: false,
  search_results: [default_book_info, default_book_info, default_book_info],
  search_filters: null,
  search_query: null,
  favorites: {
    "16037549": default_book_info,
    "2": default_book_info,
    "3": default_book_info
  },
  book_modal_visible: false,
  book_modal_info: default_book_info
};

export default function (state = initialState, action) {
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
      return { ...state, results: action.json[0], loading: false };
    case SEARCH.UPDATE_FILTERS:
      return { ...state, filters: null };
    case SEARCH.UPDATE_QUERY:
      const { query } = action.payload;
      return { ...state, query };

    case SEARCH.UPDATE_RESULTS:
      return { ...state };

    case FAVORITE.ADD:
      return { favorites: [] };

    case FAVORITE.REMOVE:
      return { favorites: [] };

    case FAVORITE.UPDATE:
      return { favorites: [] };

    case BOOK.TOGGLE_FAVORITE:
      const book_modal_favorite = state.favorites.hasOwnProperty(
        state.book_modal_info.book_id
      );
      if (book_modal_favorite == false) {
        return {
          ...state,
          favorites: {
            ...state.favorites,
            [state.book_modal_info.book_id]: state.book_modal_info
          }
        };
      } else {
        const {
          [state.book_modal_info.book_id]: temp,
          ...rest
        } = state.favorites;
        return {
          ...state,
          favorites: rest
        };
      }

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