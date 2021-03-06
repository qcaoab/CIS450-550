import {
  BOOK,
  FAVORITE,
  QUERY,
  SEARCH,
  DISCOVER,
  AUTHOR
} from "../actionTypes";
import {
  default_book_info,
  default_book_info2,
  default_book_info3,
  default_author_info1,
  default_discover,
  default_good_book1,
  author_demo
} from "./placeholder";

const initialState = {
  results: null,
  loading: false,
  search_results: [default_book_info, default_book_info2, default_book_info3],
  search_filters: null,
  search_query: "",
  favorites: {
    [default_book_info2.BOOK_ID]: default_book_info2,
    [default_book_info3.BOOK_ID]: default_book_info3,
    [default_good_book1.BOOK_ID]: default_good_book1,
    [author_demo.BOOK_ID]: author_demo
  },
  book_modal_visible: false,
  book_modal_info: default_book_info,
  author_page_info: default_author_info1,
  author_books: [default_book_info, default_book_info2, default_book_info3],
  discover_books: default_discover,
  trivia_results: {
    [QUERY.POPULAR_BOOKS]: []
  },
  author_loading: false,
  invalid_author: false,
  author_books_loading: false,
  review_loading: false,
  book_modal_review: []
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
    case DISCOVER.QUERY_BOOKS:
    case SEARCH.SUBMIT_SEARCH:
      return { ...state, loading: true };
    case DISCOVER.UPDATE_RESULTS:
      return { ...state, discover_books: action.json, loading: false };
    case QUERY.UPDATE_RESULTS:
      return {
        ...state,
        trivia_results: {
          ...state.trivia_results,
          [action.query]: action.json
        },
        loading: false
      };
    case SEARCH.UPDATE_FILTERS:
      return { ...state, filters: null };
    case SEARCH.UPDATE_QUERY:
      const { search_query } = action.payload;
      return { ...state, search_query };

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
        book_modal_visible: true,
        author_loading: true,
        review_loading: true
      };
    case AUTHOR.UPDATE:
      if (action.json.AUTHOR_ID == 0) {
        return {
          ...state,
          author_loading: false,
          invalid_author: true
        };
      } else {
        return {
          ...state,
          author_loading: false,
          invalid_author: false,
          author_page_info: action.json
        };
      }
    case AUTHOR.GET_BOOKS:
      return { ...state, author_books_loading: true };
    case AUTHOR.UPDATE_BOOKS:
      return {
        ...state,
        author_books_loading: false,
        author_books: action.json
      };
    case BOOK.GET_REVIEWS:
      return { ...state, review_loading: true };
    case BOOK.UPDATE_REVIEWS:
      return {
        ...state,
        review_loading: false,
        book_modal_review: action.json
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
