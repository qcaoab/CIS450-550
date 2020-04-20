import { FAVORITE } from "../actionTypes";

const initialState = {
  favorites: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FAVORITE.ADD: {
      return {
        favorites: []
      };
    }
    case FAVORITE.REMOVE: {
      return {
        favorites: []
      };
    }
    case FAVORITE.UPDATE: {
      return {
        favorites: []
      };
    }
    default:
      return state;
  }
}
