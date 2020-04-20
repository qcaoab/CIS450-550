import { QUERY } from "../actionTypes";

const initialState = {
  results: null,
  loading: false,
};

export default function (state = initialState, action) {
  console.log(action);
  switch (action) {
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
  }
}
