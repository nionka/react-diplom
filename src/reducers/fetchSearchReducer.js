import { CHANGE_SEARCH_FIELD, CHANGE_SEARCH_HIDE, CHECK_ENTER } from "../actions/actionTypes"

const initialState = {
  search: '',
  hide: true,
  enter: false,
}

function fetchSearchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      const { search } = action.payload;
      return { ...state, search, enter: false };
    case CHANGE_SEARCH_HIDE:
      const { hide } = action.payload;
      return { ...state, hide };
    case CHECK_ENTER:
      return { ...state, enter: true }
    default:
      return state
  }
}

export default fetchSearchReducer